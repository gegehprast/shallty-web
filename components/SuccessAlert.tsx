const SuccessAlert = (): JSX.Element => {
    return (
        <div className="w-full p-2 text-sm text-left md:text-base" role="alert">
            <p className="mb-1 text-lg font-bold">Success</p>
            <span className="w-full text-sm md:text-base">
                Membuka tautan asli di tab baru...
            </span>
        </div>
    )
}

export default SuccessAlert
