import ParserError from './ParserError'

const ErrorAlert = ({ message }: { message: string }): JSX.Element => {
    return (
        <div className="w-full p-2 text-sm text-left md:text-base" role="alert">
            <p className="text-sm font-bold md:text-base">
                <ParserError />
            </p>
            <span className="w-full text-sm md:text-base">
                {message.replace('Something went wrong. Error: ', '')}
            </span>
        </div>
    )
}

export default ErrorAlert
