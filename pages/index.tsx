import Head from 'next/head'
import { useRouter } from 'next/router'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'

const host = 'http://localhost:8080/shortlink'
const client = io(host)

const Home = (): JSX.Element => {
    const router = useRouter()
    const [shortlink, setShortlink] = useState(router.query.shortlink ? router.query.shortlink as string : '')
    const [parsed, setParsed] = useState('')
    const [parsing, setParsing] = useState(false)

    useEffect(() => {
        client.on('parse', function (msg: { url: string }) {
            console.log('receiving')
            console.log(msg)
            setParsed(msg.url)
            setParsing(false)
        })
    }, [])

    useEffect(() => {
        setShortlink(router.query.shortlink ? router.query.shortlink as string : '')
    }, [router.query.shortlink])

    useEffect(() => {
        if (shortlink.length > 0) {
            setParsing(true)
            client.emit('parse', { link: shortlink })
            console.log('emitting')
        }
    }, [shortlink])

    

    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            </Head>
            
            <div>
                Shortlink: {shortlink}
            </div>

            <div>
                Parsed: {parsing ? 'Please wait...' : parsed}
            </div>
        </div>
    )
}

export default Home
