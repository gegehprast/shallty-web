import React from 'react'
import Head from 'next/head'
import MetaHead from '../components/MetaHead'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'
import Link from 'next/link'

const Help = (): JSX.Element => {
    return (
        <>
            <MetaHead />
            
            <Head>
                <title key="TITLE">Bantuan | shallty.moe</title>
            </Head>

            <div className="relative flex flex-wrap w-full min-h-screen bg-black bg-center bg-no-repeat bg-cover bg-y-35">

                <div className="relative w-full p-8 mx-auto text-center text-white">
                    <h1 className="text-5xl font-bold md:text-6xl sh-text-shadow">
                        <Link href="/" as="/" shallow={true}>
                            <a>
                                <span className="text-sh-300">shallty</span><span>.moe</span>
                            </a>
                        </Link>
                    </h1>
                </div>

                <div className="relative w-full text-white">
                    <main className="px-2 mx-auto mb-12 md:mb-0 md:px-8 md:w-11/12 lg:w-5/6 xl:w-1/2">
                        <h2 className="mb-2 text-lg font-bold md:text-xl">Shortlink yang Didukung:</h2>

                        <ol>
                            <li className="mt-1"> - ahexa</li>
                            <li className="mt-1"> - anjay</li>
                            <li className="mt-1"> - coeg</li>
                            <li className="mt-1"> - euesiherp</li>
                            <li className="mt-1"> - hexa</li>
                            <li className="mt-1"> - hightech</li>
                            <li className="mt-1"> - jelajahinternet</li>
                            <li className="mt-1"> - kepoow</li>
                            <li className="mt-1"> - kontenajaib</li>
                            <li className="mt-1"> - neonime</li>
                            <li className="mt-1"> - semawur</li>
                            <li className="mt-1"> - siotong</li>
                            <li className="mt-1"> - sukakesehatan</li>
                            <li className="mt-1"> - teknoku</li>
                            <li className="mt-1"> - telondasmu</li>
                            <li className="mt-1"> - travellinginfos</li>
                            <li className="mt-1"> - xmaster</li>
                        </ol>
                    </main>
                </div>

                <Footer textClass="text-sh-300" linkClass="underline" />
            </div>

            <ToastContainer autoClose={false} />
        </>
    )
}

export default Help
