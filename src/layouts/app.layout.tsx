import { NextUIProvider } from '@nextui-org/system'
import { Outlet } from 'react-router-dom'
import '@/styles/index.css'

// root layout
export default function AppLayout() {
  return (
    <NextUIProvider>
      <main className='text-foreground bg-background font-open text-base w-screen'>
        <Outlet />
      </main>
    </NextUIProvider>
  )
}
