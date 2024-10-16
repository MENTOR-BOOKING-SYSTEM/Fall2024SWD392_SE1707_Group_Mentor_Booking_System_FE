import Button from '@/components/ui/button'
import ViewSubmission from '@/features/projects/view-submission/view-submission'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { CirclePlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Submission() {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-2'>
      <Button
        color='primary'
        startContent={<CirclePlus className='w-4 h-4' />}
        onClick={() => navigate(PRIVATE_ROUTES.SUBMIT_PROJECT.path)}
      >
        Submit project
      </Button>
      <ViewSubmission />
    </div>
  )
}
