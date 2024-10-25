import Wrapper from '@/components/shared/wrapper'
import Button from '@/components/ui/button'
import NotFoundSVG from '/not-found.svg'
import { useNavigate } from 'react-router-dom'
import { PRIVATE_ROUTES } from '@/routes/routes'

interface NotFoundProps {
  message?: string
  callbackFunc?: () => void
  text?: string
}

export default function NotFound({ message, callbackFunc, text = 'Back to Home' }: NotFoundProps) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(PRIVATE_ROUTES.ROOT.path)
  }

  return (
    <Wrapper className='fixed inset-0 flex items-center justify-center bg-background z-50'>
      <div className='flex flex-col items-center gap-2'>
        <img src={NotFoundSVG} alt='Not Found' className='w-96 h-96' />
        <div className='flex flex-col items-center gap-0.5 mb-2'>
          <p className='font-bold text-2xl'>OOPS!</p>
          {message ? <p>{message.toUpperCase()}</p> : <p>Resources not found</p>}
        </div>
        <Button color='primary' onClick={handleNavigate}>
          {text}
        </Button>
        {callbackFunc ? (
          <Button variant='light' onClick={callbackFunc}>
            Try again
          </Button>
        ) : null}
      </div>
    </Wrapper>
  )
}
