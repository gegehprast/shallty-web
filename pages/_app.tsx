import { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/ubuntu.css'
import '../styles/tailwind.css'
import '../styles/toastify.css'
import '../styles/loading.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return <Component {...pageProps} />
}

export default MyApp
