'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  slot?: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal'
  responsive?: boolean
  className?: string
}

export default function AdBanner({
  slot = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
}: AdBannerProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-3600083129868122'

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      console.log('AdSense init notice:', err)
    }
  }, [])

  return (
    <div className={`my-6 text-center overflow-hidden p-2 rounded-2xl bg-white/5 border border-dashed border-solar-500/20 ${className}`}>
      <div className="text-[10px] uppercase font-mono text-white/30 mb-1 tracking-widest">
        Espacio Publicitario Oficial · Google AdSense (pub-3600083129868122)
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
