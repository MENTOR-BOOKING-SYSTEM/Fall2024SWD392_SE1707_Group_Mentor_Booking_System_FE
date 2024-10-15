import Footer from '@/components/shared/is/footer'
import ISHeader from '@/components/shared/is/header'
import ISSidebar from '@/components/shared/is/sidebar'
import { IS_SIDEBAR_MENU_ITEMS } from '@/constants/menu-items'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <div className='min-h-screen w-full flex flex-col gap-2'>
      <section className='flex flex-col gap-4 flex-1'>
        <ISHeader />
        <div className='flex flex-1 gap-4'>
          <ISSidebar items={IS_SIDEBAR_MENU_ITEMS} />
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
