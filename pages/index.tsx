import { ToastContainer } from 'react-toastify'
import MetaHead from '../components/MetaHead'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Parser from '../components/Parser'
import Layout from '../components/Layout'

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

            <Layout>
                {process.env.NEXT_PUBLIC_MAINTENANCE != 'true' && <Parser />}
            </Layout>

            <ToastContainer autoClose={false} />
        </>
    )
}

export default Home
