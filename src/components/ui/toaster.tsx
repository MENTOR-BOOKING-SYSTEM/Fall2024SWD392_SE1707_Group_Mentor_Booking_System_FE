import { type Id, toast } from 'react-toastify'

interface ToastMessageProps {
  title: string
  text: string
}

function ToastMessage({ title, text }: ToastMessageProps) {
  return (
    <div className='flex flex-col gap-1'>
      <p className='font-semibold text-lg'>{title}</p>
      <p className='text-lg font-medium text-default-400'>{text}</p>
    </div>
  )
}

export function toaster(myProps: ToastMessageProps, toastProps = {}): Id {
  return toast(<ToastMessage {...myProps} />, { ...toastProps })
}

toaster.success = (myProps: ToastMessageProps, toastProps = {}) => {
  return toast.success(<ToastMessage {...myProps} />, { ...toastProps })
}

toaster.error = (myProps: ToastMessageProps, toastProps = {}) => {
  return toast.error(<ToastMessage {...myProps} />, { ...toastProps })
}

toaster.warning = (myProps: ToastMessageProps, toastProps = {}) => {
  return toast.warning(<ToastMessage {...myProps} />, { ...toastProps })
}
