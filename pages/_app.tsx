import { AppProps } from 'next/app'
import '../styles/ubuntu.css'
import '../styles/tailwind.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return <Component {...pageProps} />
}

export default MyApp