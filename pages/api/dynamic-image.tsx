import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const decodedurl = decodeURI(searchParams.get('imageurl'))


  if (!decodedurl) {
    return new ImageResponse(<>{'Visit with "?imageurl=yourimageurl"'}</>, {
      width: 1200,
      height: 630,
    })
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: 'black',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="avatar"
          src={decodedurl}
        />
        <p>check it out</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
