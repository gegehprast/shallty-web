const SuccessAlert = (): JSX.Element => {
    return (
        <div className="w-full p-2 font-semibold" role="alert">
            <p className="mb-1 text-lg font-bold">Success</p>

            <p className="w-full mb-1 text-sm">
                Membuka tautan hasil di tab baru...
            </p>
            
            <p className="w-full mb-1 text-sm">
                Popup blocked? Klik tautan hasil.
            </p>
        </div>
    )
}

export default SuccessAlert
