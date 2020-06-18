import Head from 'next/head'
import Parser from '../components/Parser'
import Footer from '../components/Footer'

const Home = (): JSX.Element => {
    return (
        <>
            <Head>
                <title>shallty.moe</title>
                
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
            
            <div className="relative flex flex-wrap w-full h-screen bg-center bg-no-repeat bg-cover bg-y-35" 
                style={{ backgroundColor: '#d49397' }}
            >
                <img src="/bg.png" className="absolute object-cover w-full h-screen" 
                    style={{ objectPosition: '50% 25%', filter: 'blur(2px)', WebkitFilter: 'blur(2px)' }} 
                />
                
                <div className="absolute w-full h-screen main-overlay"></div>

                <div className="relative flex flex-row flex-wrap items-center justify-center w-screen mx-auto text-white">
                    <div className="w-full text-center">
                        <h1 className="text-5xl font-bold md:text-6xl sh-text-shadow">
                            <span className="text-sh-300">shallty</span><span>.moe</span>
                        </h1>
                    </div>

                    <main className="w-full px-2 md:px-8 md:w-11/12 lg:w-5/6 xl:w-1/2">
                        <Parser />

                        <div className="flex w-full pl-1 mt-4">
                            <div className="flex items-center text-sm md:font-bold md:text-lg hover:text-sh-300">
                                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z" />
                                </svg>
                                &nbsp;
                                <a href="/help" className="sh-text-shadow">
                                    Bantuan
                                </a>
                            </div>
                        </div>
                    </main>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Home
