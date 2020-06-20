import ParserError from './ParserError'

const ErrorAlert = ({ errorMessage }: { errorMessage: string }): JSX.Element => {
    return (
        <div className="w-full">
            <div className="px-2 py-1 mt-4 text-lg text-left text-red-700 bg-red-100 border-l-4 border-red-500" role="alert">
                <p className="text-sm font-bold md:text-base">
                    <ParserError />
                </p>
                <span className="w-full text-sm md:text-base">
                    {errorMessage}
                </span>
            </div>
        </div>
    )
}

export default ErrorAlert
