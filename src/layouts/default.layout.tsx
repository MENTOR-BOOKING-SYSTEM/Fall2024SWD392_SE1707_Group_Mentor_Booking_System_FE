import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import Sidebar from '@/components/shared/sidebar'
import Button from '@/components/ui/button'
import http from '@/lib/axios/axios'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  const [a, setA] = useState(0)
  useEffect(() => {
    http.get('/technologies?limit=10&page=1')
    http.get('/technologies/project/:52')
    return () => {}
  }, [a])
  return (
    <div className='min-h-screen w-full flex flex-col gap-2'>
      <section className='flex flex-col gap-4 flex-1'>
        <Header />
        <div className='flex flex-1 gap-4'>
          <Sidebar />
          <div className='flex-1'>
            <Button onClick={() => setA(a + 1)}>hihi</Button>
            <Outlet />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
