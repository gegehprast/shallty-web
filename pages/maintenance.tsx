import { ToastContainer } from 'react-toastify'
import MetaHead from '../components/MetaHead'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

const Maintenance = (): JSX.Element => {
    const router = useRouter()

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_MAINTENANCE != 'true') {
            router.push('/')
        }
    }, [router])

    return (
        <>
            <MetaHead />

            <Layout>
                <h1 className="text-5xl font-bold text-center md:text-6xl sh-text-shadow">
                    Oof! Sedang maintenance.
                </h1>
            </Layout>

            <ToastContainer autoClose={false} />
        </>
    )
}

export default Maintenance
