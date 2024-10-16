import BSHeader from '@/components/shared/bs/header'
import Footer from '@/components/shared/is/footer'
import { Outlet } from 'react-router-dom'

export default function NonSidebarLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className='h-screen overflow-y-auto w-full flex flex-col gap-2'>
      <section className='flex flex-col gap-4 flex-1'>
        <BSHeader />
        <div className='flex-1'>{children || <Outlet />}</div>
      </section>
      <Footer />
    </div>
  )
}
