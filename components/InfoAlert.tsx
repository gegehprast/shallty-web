const InfoAlert = ({ handleReparse }: { handleReparse: () => void }): JSX.Element => {
    return (
        <div className="w-full p-2" role="alert">
            <p className="mb-1 text-lg font-bold">Kena shortlink lagi?</p>
            
            <button
                className="font-bold text-sh-300 hover:text-sh-100"
                onClick={handleReparse}
            >
                Klik di sini untuk mencoba bypass lagi.
            </button>
        </div>
    )
}

export default InfoAlert
