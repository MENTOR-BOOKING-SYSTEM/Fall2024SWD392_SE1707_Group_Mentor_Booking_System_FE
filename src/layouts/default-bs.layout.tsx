import Header from '@/components/shared/header'
import Sidebar from '@/components/shared/sidebar'
import ViewCurrentProject from '@/features/projects/view-current-project/view-current-project'
import DefaultLayout from './default.layout'
import { ROLES } from '@/constants'
import { useAuth } from '@/hooks/use-auth'
import { getBSSidebar, isAllowRoles } from '@/utils'
import { Outlet } from 'react-router-dom'

interface DefaultBSLayoutProps {
  urlPosition: number
}

export default function DefaultBSLayout({ urlPosition }: DefaultBSLayoutProps) {
  const { user } = useAuth()

  const sidebarItems = getBSSidebar(user)

  return (
    <DefaultLayout
      header={<Header />}
      sidebar={
        <Sidebar items={sidebarItems} urlPositon={urlPosition}>
          {isAllowRoles([ROLES.STUDENT], user) ? <ViewCurrentProject /> : null}
        </Sidebar>
      }
    >
      <Outlet />
    </DefaultLayout>
  )
}
