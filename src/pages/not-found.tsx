import Wrapper from '@/components/shared/wrapper'
import Button from '@/components/ui/button'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Wrapper className='fixed inset-0 flex items-center justify-center bg-background z-50'>
      <div className='flex flex-col items-center gap-2'>
        <p className='text-4xl font-semibold'>Oops!</p>
        <p className='text-xl'>Resources not found</p>
        <Button color='primary' onClick={() => navigate(PRIVATE_ROUTES.ROOT.path)}>
          Back to Home
        </Button>
      </div>
    </Wrapper>
  )
}
