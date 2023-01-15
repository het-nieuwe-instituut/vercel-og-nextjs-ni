  import { ImageResponse } from '@vercel/og'
  import { NextRequest } from 'next/server'

  export const config = {
    runtime: 'edge',
  }

  const font1 = fetch(new URL('../../assets/ImpactNieuw-2012.otf', import.meta.url)).then(
    (res) => res.arrayBuffer()
  )
  
  const font2 = fetch(new URL('../../assets/Cerial.ttf', import.meta.url)).then(
    (res) => res.arrayBuffer()
  )


  export default async function handler(req: NextRequest) {
    const font1Data = await font1
    const font2Data = await font2
    try {
      const { searchParams } = new URL(req.url)

      // ?title=<title>
      const hasTitle = searchParams.has('title')
      const title = hasTitle
        ? searchParams.get('title')?.slice(0, 100)
        : 'My default title'

        const title1 = title.slice(0, title.length/2)
        const title2 = title.slice(title.length/2)

      return new ImageResponse(
        (
          <div
            style={{
              backgroundColor: '#e7e5e1',
              backgroundSize: '150px 150px',
              height: '100%',
              width: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              flexWrap: 'nowrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'flex-start',
                justifyContent: 'center',
                justifyItems: 'center',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
          
            </div>
            <span
              style={{
                fontSize: 60,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                fontFamily: 'ImpactNieuw',
                color: 'black',
                lineHeight: 1.4,

              }}
            >
             {title1}
            </span>
            <span
              style={{
                fontSize: 80,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                 fontFamily: 'Cerial',
                color: 'black',
                lineHeight: 1.6,

              }}
            >
             {title2}
            </span>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: 'ImpactNieuw',
              data: font1Data,
              style: 'normal',
            },
            {
              name: 'Cerial',
              data: font2Data,
              style: 'normal',
            },
          ],
        },
    
      )
    } catch (e: any) {
      console.log(`${e.message}`)
      return new Response(`Failed to generate the image`, {
        status: 500,
      })
    }
  }
