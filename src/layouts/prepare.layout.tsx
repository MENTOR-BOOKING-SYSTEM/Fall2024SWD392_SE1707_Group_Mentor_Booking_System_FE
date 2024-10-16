import BSHeader from '@/components/shared/bs/header'
import BSSidebar from '@/components/shared/bs/sidebar'
import Footer from '@/components/shared/is/footer'
import { BS_SIDEBAR_MENU_ITEMS } from '@/constants/menu-items'
import { UserInfo } from '@/models/user.model'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { Users } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

export default function PrepareLayout() {
  const [currentUserInfo] = useLocalStorage<UserInfo>('userInfo', {
    email: '',
    firstName: '',
    lastName: '',
    avatarUrl: null,
    groupID: null,
    projectID: null,
    position: null
  })

  if (currentUserInfo) {
    let menuItems = BS_SIDEBAR_MENU_ITEMS
    if (currentUserInfo.groupID) {
      menuItems = [
        ...menuItems,
        {
          id: 2,
          title: 'Group',
          value: 'group',
          url: PRIVATE_ROUTES.GROUP.path,
          icon: (className?: string) => <Users className={className} />
        }
      ]
    }
    return (
      <div className='min-h-screen w-full flex flex-col gap-2'>
        <section className='flex flex-col gap-4 flex-1'>
          <BSHeader />
          <div className='flex flex-1 gap-4'>
            <BSSidebar items={menuItems} />
            <div className='flex-1'>
              <Outlet />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}
