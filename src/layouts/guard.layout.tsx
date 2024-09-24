import { Navigate, Outlet } from 'react-router-dom'

export default function GuardLayout() {
  const isAuth = true

  if (isAuth) {
    return <Outlet />
  }

  return <Navigate to='/login' replace />
}
