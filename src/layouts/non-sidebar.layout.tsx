import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import { Outlet } from 'react-router-dom'

export default function NonSidebarLayout() {
  return (
    <div className='h-screen overflow-y-auto w-full flex flex-col gap-2'>
      <section className='flex flex-col gap-4 flex-1'>
        <Header />
        <div className='flex-1'>
          <Outlet />
        </div>
      </section>
      <Footer />
    </div>
  )
}
