import Head from 'next/head'
import { useRouter } from 'next/router'
import io from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'

const host = 'http://localhost:8080/shortlink'
const client = io(host)

const openInNewTab = (url: string) => {
    const win = window.open(url, '_blank')
    win.focus()
}

interface Parsed {
    id: string
    success: boolean
    url: string
    original: string
    cached: boolean
    createdAt: string
    updatedAt: string
}

const initialParsed = {
    id: '',
    success: false,
    url: '',
    original: '',
    cached: false,
    createdAt: '',
    updatedAt: '',
}

const Home = (): JSX.Element => {
    const router = useRouter()
    const [shortlink, setShortlink] = useState(router.query.shortlink ? router.query.shortlink as string : '')
    const [parsed, setParsed] = useState<Parsed>(initialParsed)
    const [parsing, setParsing] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        client.on('parse', function (msg: Parsed) {
            const handler = setTimeout(() => {
                openInNewTab(msg.url)
                setParsed(msg)
                setParsing(false)

                clearTimeout(handler)
            }, 1500)
        })

        inputRef.current.focus()
    }, [])

    useEffect(() => {
        if (router.query.shortlink && router.query.shortlink.length > 0) {
            setShortlink(router.query.shortlink ? router.query.shortlink as string : '')
            setParsing(true)
            client.emit('parse', { link: router.query.shortlink })
        }
    }, [router.query.shortlink])

    const handleParse = () => {
        setParsing(true)
        client.emit('parse', { link: shortlink })
    }
    
    return (
        <>
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
            
            <main className="relative flex flex-wrap w-full h-screen bg-center bg-no-repeat bg-cover bg-y-35" 
                style={{ backgroundColor: '#d49397' }}
            >
                <img src="/bg.png" className="absolute object-cover w-full h-screen" 
                    style={{ objectPosition: '50% 25%', filter: 'blur(2px)', WebkitFilter: 'blur(2px)' }} 
                />
                
                <div className="absolute w-full h-screen main-overlay"></div>

                <div className="relative flex flex-row flex-wrap items-center justify-center w-screen mx-auto text-white">
                    <div className="w-full text-center">
                        <h1 className="text-5xl font-bold md:text-6xl" style={{ textShadow: '10px 6px 15px rgba(0, 0, 0, 1)' }}>
                            <span className="text-sh-300">shallty</span><span>.moe</span>
                        </h1>
                    </div>

                    <div className="w-full px-2 mb-auto md:px-8 md:w-11/12 lg:w-5/6 xl:w-1/2">
                        <div className="flex w-full text-center shadow-bs">
                            <input ref={inputRef}
                                value={shortlink}
                                onChange={(e) => setShortlink(e.target.value)}
                                className="relative z-10 w-10/12 p-2 text-xl leading-none border-t-2 border-b-2 border-l-2 rounded-l md:text-3xl text-sh-300 parse-input"
                            />
                            {parsing ? 
                                <button onClick={handleParse}
                                    className="flex items-stretch w-2/12 overflow-hidden border-t-2 border-b-2 border-r-2 rounded-r"
                                    disabled={true}
                                >
                                    <div className="loading-btn">
                                        <div></div><div></div><div></div>
                                    </div>
                                </button> :
                                <button onClick={handleParse}
                                    className="w-2/12 p-2 text-lg leading-none text-center border-t-2 border-b-2 border-r-2 rounded-r md:text-xl text-bold parse-button"
                                >
                                    Parse
                                </button>}
                        </div>

                        <div className="w-full mt-8 text-gray-700">
                            <div className="flex flex-row flex-no-wrap items-center rounded-l-full shadow-bs">
                                <div className="flex-1 w-3/12 py-1 pl-4 pr-2 text-lg bg-white rounded-l-full md:w-2/12 md:text-3xl">Parsed</div>
                                <div className="flex flex-no-wrap w-9/12 px-2 py-1 text-lg font-bold text-white bg-white bg-opacity-25 rounded-r md:w-10/12 md:text-3xl">
                                    {parsing ? 
                                        <span className="">Tunggu sebentar...</span> : 
                                        <a href={parsed.url} className="truncate transition-colors duration-200 ease-in text-sh-300 hover:text-sh-100" target="_blank" rel="noreferrer">
                                            {parsed.url}
                                        </a>
                                    }
                                </div>
                            </div>

                            <div className="flex flex-row flex-no-wrap items-center mt-2 rounded-l-full shadow-bs">
                                <div className="flex-1 w-3/12 py-1 pl-4 pr-2 text-base bg-white rounded-l-full md:w-2/12 md:text-xl">Original</div>
                                <div className="flex flex-no-wrap w-9/12 px-2 py-1 text-base font-bold text-white bg-white bg-opacity-25 rounded-r md:w-10/12 md:text-xl">
                                    <span className="truncate">
                                        {shortlink}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-row flex-no-wrap items-center mt-2 rounded-l-full shadow-bs">
                                <div className="flex-1 w-3/12 py-1 pl-4 pr-2 text-base bg-white rounded-l-full md:w-2/12 md:text-xl">Cached</div>
                                <div className="flex flex-no-wrap w-9/12 px-2 py-1 text-base font-bold text-white bg-white bg-opacity-25 rounded-r md:w-10/12 md:text-xl">
                                    {parsing ? 
                                        <span className="">Tunggu sebentar...</span> : 
                                        <span className="uppercase">{parsed.cached.toString()}</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}

export default Home
