
import Link from 'next/link'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'
import MetaHead from '../components/MetaHead'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Parser from '../components/Parser'

const Home = (): JSX.Element => {
    const router = useRouter()

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_MAINTENANCE == 'true') {
            router.push('/maintenance')
        }
    }, [router])

    return (
        <>
            <MetaHead />

            <div className="relative flex flex-wrap w-full h-screen bg-center bg-no-repeat bg-cover bg-y-35"
                style={{ backgroundColor: '#d49397' }}
            >
                {/* image bg */}
                <img src="/bg.png" className="absolute object-cover w-full h-screen"
                    style={{ objectPosition: '50% 25%', filter: 'blur(2px)', WebkitFilter: 'blur(2px)' }}
                />

                {/* overlay */}
                <div className="absolute w-full h-screen bg-black bg-opacity-50"></div>

                {/* content */}
                <div className="absolute flex flex-col justify-between w-full h-screen">
                    <div className="relative w-full p-8 pb-0 mx-auto text-center">
                        <h1 className="text-5xl font-bold md:text-6xl sh-text-shadow">
                            <Link href="/" as="/" shallow={true}>
                                <a>
                                    <span className="text-sh-300">shallty</span><span>.moe</span>
                                </a>
                            </Link>
                        </h1>
                    </div>

                    <div className="relative w-full">
                        <main className="px-2 mx-auto md:px-8 md:w-11/12 lg:w-5/6 xl:w-1/2">
                            <Parser />
                        </main>
                    </div>

                    <Footer />
                </div>
            </div>

            <ToastContainer autoClose={false} />
        </>
    )
}

export default Home
