const FirstTimeVisitAlert = (): JSX.Element => {
    return (
        <div className="w-full p-2 font-semibold" role="alert">
            <p className="mb-2 text-sm">
                Kamu adalah orang pertama yang mencoba mem-bypass tautan ini. Ini akan memakan waktu sedikit lebih lama.
            </p>

            <p className="mb-1 text-sm">
                Berkat kamu, orang lain akan dapat mem-bypass dengan cepat. Terima kasih!
            </p>
        </div>
    )
}

export default FirstTimeVisitAlert
