import React from 'react'
import { useRouter } from 'next/router'
import io from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'
import ParserWait from './ParserWait'
import ErrorAlert from './ErrorAlert'
import SuccessAlert from './SuccessAlert'
import InfoAlert from './InfoAlert'
import { dismissToast, showToast } from '../utils/toast'

const SUCCESS_TOAST = 'SUCCESS_TOAST'
const INFO_TOAST = 'INFO_TOAST'
const ERROR_TOAST = 'ERROR_TOAST'
const host = 'http://localhost:8080/shortlink'
const client = io(host)

const openInNewTab = (url: string) => {
    const newTab = window.open(url, '_blank')

    if (newTab) {
        newTab.focus()
    }
}

interface Parsed {
    url: string
    id?: string
    error?: boolean
    success?: boolean
    original?: string
    cached?: boolean
    createdAt?: string
    updatedAt?: string
    message?: string
}

const initialParsed = {
    id: '',
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
    const [error, setError] = useState(false)
    const [parsing, setParsing] = useState(true)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        client.on('parse', function (res: Parsed) {
            dismissToast(SUCCESS_TOAST)
            dismissToast(INFO_TOAST)
            dismissToast(ERROR_TOAST)

            if (res.success) {
                setError(false)
                const handler = setTimeout(() => {
                    setParsed(res)

                    setParsing(false)

                    showToast(<SuccessAlert />, {
                        id: SUCCESS_TOAST,
                        type: 'success',
                    })

                    showToast(<InfoAlert handleReparse={() => handleParse(res.url)} />, {
                        id: INFO_TOAST,
                        type: 'info',
                        delay: 500,
                    })

                    setTimeout(() => {
                        openInNewTab(res.url)
                    }, 1500)

                    clearTimeout(handler)
                }, 1500)
            } else {
                setError(true)

                setParsing(false)

                showToast(<ErrorAlert message={res.message} />, {
                    id: ERROR_TOAST,
                    type: 'error',
                })
            }
        })

        inputRef.current.focus()
    }, [])

    useEffect(() => {
        if (router.query.shortlink && router.query.shortlink.length > 0) {
            setShortlink(router.query.shortlink as string)
            setParsing(true)
            client.emit('parse', { link: router.query.shortlink as string })
        } else {
            setParsing(false)
        }
    }, [router.query.shortlink])

    const handleParse = (shortlink: string) => {
        router.push({
            pathname: '/',
            query: { shortlink: decodeURIComponent(shortlink) }
        })
    }

    return (
        <>
            <div className="flex w-full text-center shadow-bs">
                <input ref={inputRef}
                    value={shortlink}
                    onChange={(e) => setShortlink(e.target.value)}
                    className="relative z-10 w-10/12 p-2 text-xl leading-none border-t-2 border-b-2 border-l-2 rounded-l md:text-3xl text-sh-300 parse-input"
                    placeholder="Masukkan shortlink di sini"
                />
                {parsing ?
                    <button
                        className="flex items-stretch w-2/12 overflow-hidden border-t-2 border-b-2 border-r-2 rounded-r"
                        disabled={true}
                    >
                        <div className="loading-block">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </button> :
                    <button onClick={() => handleParse(shortlink)}
                        className="w-2/12 p-2 text-sm font-bold leading-none text-center border-t-2 border-b-2 border-r-2 rounded-r md:text-2xl parse-button"
                    >
                        GET
                    </button>}
            </div>

            <div className="w-full mt-6 text-gray-700">
                <div className="flex flex-row flex-no-wrap items-center rounded-l-full shadow-bs">
                    <div className="w-3/12 py-1 pl-4 pr-2 text-lg bg-white rounded-l-full md:w-2/12 md:text-3xl">Hasil</div>
                    <div className="flex flex-no-wrap w-9/12 px-2 py-1 text-lg font-bold text-white bg-white bg-opacity-25 md:w-10/12 md:text-3xl">
                        {parsing && <ParserWait />}

                        {!parsing && parsed.url === '' && 'Menunggu...'}

                        {(!parsing && error) && <ParserWait />}

                        {(!parsing && !error) && <a href={parsed.url} 
                            className="truncate transition-colors duration-200 ease-in text-sh-300 hover:text-sh-100" 
                            target="_blank" 
                            rel="noreferrer"
                        >
                            {parsed.url}
                        </a>}
                    </div>
                </div>

                <div className="flex flex-row flex-no-wrap items-center mt-2 rounded-l-full shadow-bs">
                    <div className="flex-1 w-3/12 py-1 pl-4 pr-2 text-base bg-white rounded-l-full md:w-2/12 md:text-xl">Asli</div>
                    <div className="flex flex-no-wrap w-9/12 px-2 py-1 text-base font-bold text-white bg-white bg-opacity-25 rounded-r md:w-10/12 md:text-xl">
                        <span className="truncate">
                            {shortlink.length > 0 ? shortlink : 'Menunggu...'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-row flex-no-wrap items-center mt-2 rounded-l-full shadow-bs">
                    <div className="flex-1 w-3/12 py-1 pl-4 pr-2 text-base bg-white rounded-l-full md:w-2/12 md:text-xl">Cached</div>
                    <div className="flex flex-no-wrap items-center w-9/12 px-2 py-1 text-base font-bold text-white bg-white bg-opacity-25 rounded-r md:w-10/12 md:text-xl">
                        {parsing && <ParserWait />}

                        {(!parsing && error) && <ParserWait />}

                        {(!parsing && !error && parsed.url !== '') && <>
                            <span className="italic uppercase">{parsed.cached.toString()}</span>
                            <div title="Menandakan apakah tautan ini telah diproses sebelumnya.">
                                <svg className="w-4 h-4 ml-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z" />
                                </svg>
                            </div>
                        </>}

                        {(!parsing && !error && parsed.url === '') && 'Menunggu...'}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Parser
