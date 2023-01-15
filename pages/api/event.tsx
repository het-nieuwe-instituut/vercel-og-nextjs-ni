import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

const rndInt = Math.floor(Math.random() * 6) + 1.4


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
    const decodedurl = decodeURI(searchParams.get('imageurl'))
    const eventDate = searchParams.get('date')

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title'

      const title1 = title.slice(0, title.length/rndInt)
      const title2 = title.slice(title.length/rndInt)

    return new ImageResponse(
      (

        
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'left',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: 'white',
            padding: 40

         
          }}
        >
        <img
        alt="plaatje"
        src={decodedurl}
        style={{
          width: "1200px",
          height: "630px",
          objectFit: "cover",
          position: "absolute",
          opacity: 0.8
      }}
      />
          <span
            style={{
              fontSize: 60,
              fontStyle: 'normal',
              fontFamily: 'ImpactNieuw',
              color: 'black',
              lineHeight: 1.1,
            
            }}
          >
           {title1}
          </span>
          <span
            style={{
              fontSize: 71,
              fontStyle: 'normal', 
               fontFamily: 'Cerial',
              color: 'black',
              lineHeight: 1.1,
              transform: "translateY(-11px)"
            }}
          >
           {title2}
          </span>
          <div 
          style={{
              fontSize: 40,
              backgroundColor: '#e7e5e1',
              fontStyle: 'normal', 
               fontFamily: 'Cerial',
              color: 'black',
              lineHeight: 1.1,
              textAlign: 'right',
              position: 'absolute',
              bottom: 0,
              right: 0,
              padding: 30
            }}>{eventDate}

          </div>
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
