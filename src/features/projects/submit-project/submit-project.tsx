import SubmitProjectFormForOthers from './submit-project-for-others/submit-project-form.provider'
import SubmitProjectFormForMentor from './submit-project-for-mentor/submit-project-form.provider'
import { ROLES } from '@/constants'
import { useUser } from '@/hooks/use-user'
import { isAllowRoles } from '@/utils'

export default function SubmitProject() {
  const { user } = useUser()

  if (isAllowRoles([ROLES.STUDENT, ROLES.BUSINESS], user)) {
    return <SubmitProjectFormForOthers />
  } else if (isAllowRoles([ROLES.MENTOR], user)) {
    return <SubmitProjectFormForMentor />
  }
}
