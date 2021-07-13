import ParserError from './ParserError'

const ErrorAlert = ({ message, handleReparse }: { message: string, handleReparse: () => void }): JSX.Element => {
    return (
        <div className="w-full p-2 font-semibold" role="alert">
            <p className="text-lg font-bold">
                <ParserError />
            </p>
            
            <p className="w-full mb-1 text-sm">
                {message.replace('Something went wrong. Error: ', '')}
            </p>

            <button
                className="text-sm font-bold text-sh-300 hover:text-sh-100"
                onClick={handleReparse}
            >
                Klik di sini untuk mencoba lagi.
            </button>
        </div>
    )
}

export default ErrorAlert
