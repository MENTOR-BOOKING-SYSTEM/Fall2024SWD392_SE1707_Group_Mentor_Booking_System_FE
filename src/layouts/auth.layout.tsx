import WaveBg from '/wave-bg.jpg'
import { Card, CardBody } from '@nextui-org/card'
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  const isAuth = false

  if (isAuth) {
    return <Navigate to='/' replace />
  }

  return (
    <div className='flex min-h-screen  items-center justify-center'>
      <Card
        isBlurred
        className='border-none bg-background/60 max-w-screen-xl mx-4 md:mx-6 min-w-80 h-[620px] flex flex-col'
        shadow='sm'
      >
        <CardBody>
          <div className='grid grid-cols-6 md:grid-cols-12 gap-6 lg:gap-4 items-center h-full justify-center'>
            <div className='relative md:col-span-8 h-full hidden lg:block'>
              <img src={WaveBg} alt='Auth background' className='object-cover w-full h-full rounded-xl ' />
            </div>
            <div className='flex flex-1 flex-col col-span-12 lg:col-span-4 p-2'>
              <Outlet />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
