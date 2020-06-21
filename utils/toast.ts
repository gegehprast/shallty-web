
import { toast, TypeOptions, ToastContent, Id } from 'react-toastify'

export const showToast = (content: ToastContent, { id, type, delay }: { id: Id, type: TypeOptions, delay?: number }): void => {
    toast(content, {
        position: 'bottom-right',
        toastId: id,
        autoClose: false,
        type: type,
        delay: delay || 0
    })
}

export const dismissToast = (id: Id): void => {
    toast.dismiss(id)
}