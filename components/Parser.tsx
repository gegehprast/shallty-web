import React from 'react'
import { useRouter } from 'next/router'
import io from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'

const host = 'http://localhost:8080/shortlink'
const client = io(host)

const openInNewTab = (url: string) => {
    const newTab = window.open(url, '_blank')

    if (newTab) {
        newTab.focus()
    }
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

const Parser = (): JSX.Element => {
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
                        className="w-2/12 p-2 text-sm font-bold leading-none text-center border-t-2 border-b-2 border-r-2 rounded-r md:text-2xl parse-button"
                    >
                        GET
                    </button>}
            </div>

            <div className="w-full mt-8 text-gray-700">
                <div className="flex flex-row flex-no-wrap items-center rounded-l-full shadow-bs">
                    <div className="flex-1 w-3/12 py-1 pl-4 pr-2 text-lg bg-white rounded-l-full md:w-2/12 md:text-3xl">Hasil</div>
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
                    <div className="flex-1 w-3/12 py-1 pl-4 pr-2 text-base bg-white rounded-l-full md:w-2/12 md:text-xl">Orisinal</div>
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
        </>
    )
}

export default Parser
