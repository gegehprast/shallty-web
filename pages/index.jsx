import Head from 'next/head'
import { useRouter } from 'next/router'
import io from 'socket.io-client'

const host = 'http://localhost:8080/shortlink'
const client = io(host)

client.on('parse', function (msg) {
    console.log('receiving')
    console.log(msg)
})

export default function Home() {
    const router = useRouter()

    if (router.query.shortlink) {
        client.emit('parse', { link: router.query.shortlink })
        console.log('emitting')
    }

    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            HALO!
        </div>
    )
}
