import Button from '@/components/ui/button'
import ViewSubmission from '@/features/projects/view-submission/view-submission'
import { useUser } from '@/hooks/use-user'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { CirclePlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Submission() {
  const navigate = useNavigate()
  const { currentUserInfo } = useUser()

  return (
    <div className='flex flex-col gap-2'>
      {currentUserInfo.groupID && !currentUserInfo.projectID && currentUserInfo.position === 'Leader' ? (
        <Button
          color='primary'
          startContent={<CirclePlus className='w-4 h-4' />}
          onClick={() => navigate(PRIVATE_ROUTES.SUBMIT_PROJECT.path)}
        >
          Submit project
        </Button>
      ) : null}
      <ViewSubmission />
    </div>
  )
}
