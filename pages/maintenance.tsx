
import Link from 'next/link'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'
import MetaHead from '../components/MetaHead'

const Maintenance = (): JSX.Element => {
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
                        <Link href="/" as="/" shallow={true}>
                            <a>
                                <span className="text-sh-300">shallty</span><span>.moe</span>
                            </a>
                        </Link>
                    </h1>
                </div>

                <div className="relative w-full text-white">
                    <main className="px-2 mx-auto md:px-8 md:w-11/12 lg:w-5/6 xl:w-1/2">
                        <h1 className="text-5xl font-bold md:text-6xl sh-text-shadow">
                            Oof! Sedang maintenance.
                        </h1>
                    </main>
                </div>

                <Footer />
            </div>

            <ToastContainer autoClose={false} />
        </>
    )
}

export default Maintenance
