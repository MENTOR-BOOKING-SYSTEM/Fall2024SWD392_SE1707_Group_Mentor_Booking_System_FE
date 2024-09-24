import { Navigate, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  const isAuth = true

  if (isAuth) {
    return <Navigate to='/' replace />
  }

  return (
    <div>
      <p>Auth Layout</p>
      <Outlet />
    </div>
  )
}
