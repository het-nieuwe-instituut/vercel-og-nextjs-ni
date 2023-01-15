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

        const title1 = title.slice(0, title.length/1.8)
        const title2 = title.slice(title.length/1.8)

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
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: '40px'
            }}
          >
         
            <span
              style={{
                fontSize: 90,
                fontStyle: 'normal',
                fontFamily: 'ImpactNieuw',
                color: 'black',
                lineHeight: 1.4,
              }}
            >
             {title1}
            </span>
            <span
              style={{
                fontSize: 110,
                fontStyle: 'normal', 
                 fontFamily: 'Cerial',
                color: 'black',
                lineHeight: 1.6,
                marginTop: "-28px"

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
