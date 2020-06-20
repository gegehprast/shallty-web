const SuccessAlert = ({ handleReparse }: { handleReparse: (e: React.MouseEvent) => void }): JSX.Element => {
    return (
        <div className="w-full">
            <div className="px-2 py-1 mt-4 text-sm text-left text-blue-700 bg-blue-100 border-l-4 border-blue-500 md:text-base" role="alert">
                <p className="font-bold">Kena shortlink lagi?</p>
                <a href="#"
                    className="text-sh-300 hover:text-sh-100"
                    onClick={handleReparse}
                >
                    Klik di sini untuk memulai lagi.
                </a>
            </div>
        </div>
    )
}

export default SuccessAlert
