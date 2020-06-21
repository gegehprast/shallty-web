
import Link from 'next/link'
import Parser from '../components/Parser'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'
import MetaHead from '../components/MetaHead'

const Home = (): JSX.Element => {
    return (
        <>
            <MetaHead />
            
            <div className="relative flex flex-wrap w-full h-screen bg-center bg-no-repeat bg-cover bg-y-35" 
                style={{ backgroundColor: '#d49397' }}
            >
                <img src="/bg.png" className="absolute object-cover w-full h-screen" 
                    style={{ objectPosition: '50% 25%', filter: 'blur(2px)', WebkitFilter: 'blur(2px)' }} 
                />
                
                <div className="absolute w-full h-screen main-overlay"></div>

                <div className="relative w-full p-8 mx-auto text-center text-white">
                    <h1 className="text-5xl font-bold md:text-6xl sh-text-shadow">
                        <span className="text-sh-300">shallty</span><span>.moe</span>
                    </h1>
                </div>

                <div className="relative w-full text-white">

                    <main className="px-2 mx-auto md:px-8 md:w-11/12 lg:w-5/6 xl:w-1/2">
                        <Parser />

                        <div className="flex w-full pl-1 mt-4">
                            <div className="flex items-center text-sm md:font-bold md:text-lg hover:text-sh-300">
                                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z" />
                                </svg>
                                &nbsp;
                                <Link href="/help" as="/help">
                                    <a className="sh-text-shadow">
                                        Bantuan
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>

                <Footer />
            </div>

            <ToastContainer autoClose={false} />
        </>
    )
}

export default Home
