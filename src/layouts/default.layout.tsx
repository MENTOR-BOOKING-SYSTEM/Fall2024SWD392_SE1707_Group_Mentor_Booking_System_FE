import Footer from '@/components/footer'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <div className='w-full min-h-screen flex flex-col gap-2'>
      <section className='flex flex-col gap-4 flex-1'>
        <Header />
        <div className='flex flex-1 gap-4'>
          <Sidebar />
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
