import React from 'react'
import Head from 'next/head'
import MetaHead from '../components/MetaHead'
import { ToastContainer } from 'react-toastify'
import Layout from '../components/Layout'

const Help = (): JSX.Element => {
    return (
        <>
            <MetaHead />
            
            <Head>
                <title key="TITLE">shallty.moe | Bantuan</title>
            </Head>

            <Layout heightClass="min-h-screen">
                <div>
                    <h2 className="mb-2 text-lg font-bold md:text-xl">Shortlink yang didukung</h2>

                    <ol>
                        <li className="mt-1"> - teknoku</li>
                        <li className="mt-1"> - drivemoe</li>
                    </ol>
                </div>

                <div className="mt-12">
                    <h2 className="mb-2 text-lg font-bold md:text-xl">Lapor bug</h2>

                    <span className="text-base">
                        Ada yang kurang jelas? Mau lapor bug? Silakan ke <a href="https://bit.ly/ShalltyDiscord" 
                            className="transition-colors duration-200 ease-in text-sh-300 hover:text-sh-100" 
                            target="_blank" 
                            rel="noreferrer"
                        > server</a> Discord Shallty.
                    </span>
                </div>
            </Layout>

            <ToastContainer autoClose={false} />
        </>
    )
}

export default Help
