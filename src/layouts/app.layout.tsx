import { NextUIProvider } from '@nextui-org/system'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/lib/redux-toolkit/store'
import '@/styles/index.css'

// root layout
export default function AppLayout() {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <main className='text-foreground bg-background font-open text-base w-screen'>
          <Outlet />
        </main>
      </NextUIProvider>
    </Provider>
  )
}
