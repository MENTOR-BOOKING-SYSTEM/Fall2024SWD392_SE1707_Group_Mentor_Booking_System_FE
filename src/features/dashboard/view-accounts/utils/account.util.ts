import { ROLES } from '@/constants'

type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

export const getColor = (roleName: string): Color => {
  switch (roleName) {
    case ROLES.STUDENT:
      return 'primary'
    case ROLES.MENTOR:
      return 'secondary'
    case ROLES.REVIEWER:
      return 'success'
    case ROLES.BUSINESS:
      return 'warning'
    case ROLES.MANAGER:
      return 'danger'
    default:
      return 'default'
  }
}
