import { NextResponse } from 'next/server'

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>HELIOX</ShortName>
  <Description>Buscar eventos solares y telemetría en tiempo real en HELIOX por JESÚS BARRIOS</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Image width="64" height="64" type="image/svg+xml">https://heliox-observatory.vercel.app/favicon.svg</Image>
  <Url type="text/html" template="https://heliox-observatory.vercel.app/storms?q={searchTerms}"/>
</OpenSearchDescription>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/opensearchdescription+xml; charset=utf-8',
    },
  })
}
