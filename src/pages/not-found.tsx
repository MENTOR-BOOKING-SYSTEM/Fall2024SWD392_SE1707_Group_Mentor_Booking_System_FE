import Wrapper from '@/components/shared/wrapper'
import Button from '@/components/ui/button'
import NotFoundSVG from '/not-found.svg'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Wrapper className='fixed inset-0 flex items-center justify-center bg-background z-50'>
      <div className='flex flex-col items-center gap-2'>
        <img src={NotFoundSVG} alt='Not Found' className='w-96 h-96' />
        <div className='flex flex-col items-center gap-0.5 mb-2'>
          <p className='font-bold text-2xl'>OOPS!</p>
          <p>Resources not found</p>
        </div>
        <Button color='primary' onClick={() => navigate(PRIVATE_ROUTES.ROOT.path)} size='sm'>
          Back to Home
        </Button>
      </div>
    </Wrapper>
  )
}
