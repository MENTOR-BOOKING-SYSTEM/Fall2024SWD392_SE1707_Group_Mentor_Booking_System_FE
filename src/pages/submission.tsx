import Button from '@/components/ui/button'
import { ROLES } from '@/constants'
import ViewSubmission from '@/features/projects/view-submission/view-submission'
import { useUser } from '@/hooks/use-user'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { isAllowRoles } from '@/utils'
import { CirclePlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Submission() {
  const navigate = useNavigate()
  const { currentUserInfo, user } = useUser()

  const isValid = () => {
    if (isAllowRoles([ROLES.STUDENT], user)) {
      if (currentUserInfo.groupID && !currentUserInfo.projectID && currentUserInfo.position === 'Leader') {
        return true
      } else {
        return false
      }
    }
    return true
  }

  return (
    <div className='flex flex-col gap-2'>
      {isValid() ? (
        <Button
          color='primary'
          startContent={<CirclePlus className='w-4 h-4' />}
          className='ml-auto'
          onClick={() => navigate(PRIVATE_ROUTES.SUBMIT_PROJECT.path)}
        >
          Submit project
        </Button>
      ) : null}
      <ViewSubmission />
    </div>
  )
}
