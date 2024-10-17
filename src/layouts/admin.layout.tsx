import ADHeader from '@/components/shared/admin/header'
import ADSidebar from '@/components/shared/admin/sidebar'
import Footer from '@/components/shared/is/footer'
import { ADMIN_SIDEBAR_MENU_ITEMS } from '@/constants/menu-items'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className='min-h-screen w-full flex flex-col gap-2'>
      <section className='flex flex-col gap-4 flex-1'>
        <ADHeader />
        <div className='flex flex-1 gap-4'>
          <ADSidebar items={ADMIN_SIDEBAR_MENU_ITEMS} />
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
