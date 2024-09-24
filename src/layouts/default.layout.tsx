import Footer from '@/components/footer'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <section className='flex flex-1'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
          <Header />
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
