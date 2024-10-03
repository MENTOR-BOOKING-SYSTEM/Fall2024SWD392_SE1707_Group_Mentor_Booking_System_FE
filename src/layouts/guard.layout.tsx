import { useAuth } from '@/hooks/use-auth'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { Navigate, Outlet } from 'react-router-dom'

export default function GuardLayout() {
  const { isAuth } = useAuth()

  if (isAuth) {
    return <Outlet />
  }

  return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />
}
