import Button from '@/components/ui/button'
import ViewSubmission from '@/features/projects/view-submission/view-submission'
import { ROLES } from '@/constants'
import { useUser } from '@/hooks/use-user'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { isAllowRoles } from '@/utils'
import { CirclePlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Submission() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { currentUserInfo } = useUser()

  const isValid = () => {
    if (isAllowRoles([ROLES.STUDENT], user)) {
      if (currentUserInfo?.groupID && !currentUserInfo?.projectID && currentUserInfo?.position === 'Leader') {
        return true
      } else {
        return false
      }
    }
    return true
  }

  return (
    <div className='flex flex-col gap-2 h-full'>
      <Button
        color='primary'
        startContent={<CirclePlus className='w-4 h-4' />}
        className='ml-auto'
        onClick={() => navigate(PRIVATE_ROUTES.SUBMIT_PROJECT.path)}
        disabled={!isValid()}
      >
        Submit project
      </Button>
      <div className='flex-1'>
        <ViewSubmission />
      </div>
    </div>
  )
}
