import QueryProvider from '@/lib/react-query/query.provider'
import { NextUIProvider } from '@nextui-org/system'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/lib/redux-toolkit/store'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/index.css'

// root layout
export default function AppLayout() {
  return (
    <QueryProvider>
      <Provider store={store}>
        <NextUIProvider locale='en-GB'>
          <main className='text-foreground bg-background font-open text-base w-screen'>
            <Outlet />
            <ToastContainer stacked autoClose={3000} icon={false} />
          </main>
        </NextUIProvider>
      </Provider>
    </QueryProvider>
  )
}
