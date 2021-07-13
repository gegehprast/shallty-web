const SuccessAlert = (): JSX.Element => {
    return (
        <div className="w-full p-2 text-sm text-left md:text-base" role="alert">
            <p className="mb-1 text-lg font-bold">Success</p>

            <p className="w-full mb-1 text-sm md:text-base">
                Membuka tautan hasil di tab baru...
            </p>
            
            <p className="w-full mb-1 text-sm md:text-base">
                Popup blocked? Klik tautan hasil.
            </p>
        </div>
    )
}

export default SuccessAlert
