import React from 'react'
import { useRouter } from 'next/router'
import io from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'
import { toast, TypeOptions, ToastContent, Id } from 'react-toastify'
import ParserWait from './ParserWait'
import ErrorAlert from './ErrorAlert'
import SuccessAlert from './SuccessAlert'
import InfoAlert from './InfoAlert'

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

const showToast = (content: ToastContent, { id, type, delay }: { id: Id, type: TypeOptions, delay?: number }) => {
    toast(content, {
        position: 'bottom-right',
        toastId: id,
        autoClose: false,
        type: type,
        delay: delay || 0
    })
}

const dismissToast = (id: Id) => {
    toast.dismiss(id)
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
                    <div className="flex-1 w-3/12 py-1 pl-4 pr-2 text-base bg-white rounded-l-full md:w-2/12 md:text-xl">Orisinal</div>
                    <div className="flex flex-no-wrap w-9/12 px-2 py-1 text-base font-bold text-white bg-white bg-opacity-25 rounded-r md:w-10/12 md:text-xl">
                        <span className="truncate">
                            {shortlink.length > 0 ? shortlink : 'Menunggu...'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-row flex-no-wrap items-center mt-2 rounded-l-full shadow-bs">
                    <div className="flex-1 w-3/12 py-1 pl-4 pr-2 text-base bg-white rounded-l-full md:w-2/12 md:text-xl">Cached</div>
                    <div className="flex flex-no-wrap w-9/12 px-2 py-1 text-base font-bold text-white bg-white bg-opacity-25 rounded-r md:w-10/12 md:text-xl">
                        {parsing && <ParserWait />}

                        {(!parsing && error) && <ParserWait />}

                        {(!parsing && !error) && <span className="italic uppercase">{parsed.cached.toString()}</span>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Parser
