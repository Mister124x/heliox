"""
Router de Pagos y Donaciones Multipasarela.
HELIOX — por JESÚS BARRIOS

Soporta:
- Nequi / Daviplata
- Cuenta de Ahorros / PSE
- PayPal
- Tarjetas de Crédito / Débito (Wompi, Stripe)
"""

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from typing import Optional
from config import settings
import structlog

logger = structlog.get_logger()
router = APIRouter()


class PaymentIntentRequest(BaseModel):
    amount: float
    currency: str = "COP"  # COP o USD
    method: str  # nequi, daviplata, bank_transfer, wompi_card, paypal, stripe
    payer_name: Optional[str] = None
    payer_email: Optional[str] = None
    payer_message: Optional[str] = None


@router.get("/methods")
async def get_payment_methods():
    """
    Retorna todos los métodos de pago disponibles y datos públicos
    para realizar transferencias y pagos en línea.
    """
    return {
        "status": "ok",
        "beneficiary": {
            "name": settings.ACCOUNT_HOLDER_NAME,
            "document": settings.ACCOUNT_HOLDER_DOC,
            "project": "HELIOX Solar Observatory",
        },
        "colombia_direct": {
            "nequi": {
                "active": True,
                "phone": settings.NEQUI_NUMBER,
                "type": "Nequi",
                "holder": settings.ACCOUNT_HOLDER_NAME,
            },
            "daviplata": {
                "active": True,
                "phone": settings.DAVIPLATA_NUMBER,
                "type": "Daviplata",
                "holder": settings.ACCOUNT_HOLDER_NAME,
            },
            "bank_account": {
                "active": True,
                "bank": settings.BANK_NAME,
                "account_type": settings.BANK_ACCOUNT_TYPE,
                "account_number": settings.BANK_ACCOUNT_NUMBER,
                "holder": settings.ACCOUNT_HOLDER_NAME,
                "document": settings.ACCOUNT_HOLDER_DOC,
            },
        },
        "online_gateways": {
            "wompi": {
                "active": bool(settings.WOMPI_PUBLIC_KEY and settings.WOMPI_PUBLIC_KEY != "pub_test_XXXXXXXX"),
                "public_key": settings.WOMPI_PUBLIC_KEY,
                "supports": ["Tarjetas Crédito/Débito", "PSE", "Nequi", "Botón Bancolombia"],
                "currency": "COP",
            },
            "paypal": {
                "active": bool(settings.PAYPAL_ME_URL),
                "paypal_me_url": settings.PAYPAL_ME_URL,
                "client_id": settings.PAYPAL_CLIENT_ID,
                "supports": ["PayPal Balance", "Tarjetas Internacionales (Visa, MC, Amex)"],
                "currency": "USD",
            },
            "stripe": {
                "active": bool(settings.STRIPE_PUBLIC_KEY and settings.STRIPE_PUBLIC_KEY != "pk_test_XXXXXXXX"),
                "public_key": settings.STRIPE_PUBLIC_KEY,
                "supports": ["Tarjetas Internacionales", "Apple Pay", "Google Pay"],
                "currency": "USD",
            },
        },
        "author": "JESÚS BARRIOS · HELIOX",
    }


@router.post("/intent")
async def create_payment_intent(intent: PaymentIntentRequest):
    """
    Registra la intención de donación/pago y retorna instrucciones o checkout data.
    """
    logger.info(
        "Intención de pago registrada",
        method=intent.method,
        amount=intent.amount,
        currency=intent.currency,
        payer=intent.payer_name,
    )

    if intent.method in ["nequi", "daviplata"]:
        return {
            "status": "pending_manual_transfer",
            "number": settings.NEQUI_NUMBER if intent.method == "nequi" else settings.DAVIPLATA_NUMBER,
            "holder": settings.ACCOUNT_HOLDER_NAME,
            "amount": intent.amount,
            "instructions": f"Transfiere ${intent.amount:,.0f} COP al número desde tu app de {intent.method.title()}.",
        }

    elif intent.method == "bank_transfer":
        return {
            "status": "pending_bank_transfer",
            "bank": settings.BANK_NAME,
            "account_type": settings.BANK_ACCOUNT_TYPE,
            "account_number": settings.BANK_ACCOUNT_NUMBER,
            "holder": settings.ACCOUNT_HOLDER_NAME,
            "doc": settings.ACCOUNT_HOLDER_DOC,
            "amount": intent.amount,
        }

    elif intent.method == "paypal":
        amount_usd = intent.amount if intent.currency == "USD" else round(intent.amount / 4000, 2)
        redirect_url = f"{settings.PAYPAL_ME_URL}/{amount_usd}USD"
        return {
            "status": "redirect",
            "redirect_url": redirect_url,
            "amount_usd": amount_usd,
        }

    return {
        "status": "ready",
        "message": "Usa la pasarela web en línea correspondiente.",
    }


@router.post("/webhook/wompi")
async def wompi_webhook(request: Request):
    """Webhook para confirmar pagos exitosos de Wompi (Tarjetas, PSE, Nequi)."""
    payload = await request.json()
    logger.info("Wompi Webhook recibido", payload=payload)
    # Aquí se puede registrar en PostgreSQL y emitir alertas o accesos premium
    return {"status": "received"}


@router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Webhook para confirmar pagos exitosos de Stripe."""
    payload = await request.json()
    logger.info("Stripe Webhook recibido", payload=payload)
    return {"status": "received"}
