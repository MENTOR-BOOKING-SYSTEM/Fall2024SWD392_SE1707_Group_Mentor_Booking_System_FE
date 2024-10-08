import { useAuth } from '@/hooks/use-auth'
import { AuthModel, CodeModel } from '@/models/base.model'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

export default function GuardLayout() {
  const { isAuth } = useAuth()
  const [_auth, _setAuth, removeAuth] = useLocalStorage<AuthModel>('auth', { accessToken: '', refreshToken: '' })
  const [_code, _setCode, removeCode] = useLocalStorage<CodeModel>('code', { code: '' })

  useEffect(() => {
    if (!isAuth) {
      removeAuth()
    }
    removeCode()
  }, [isAuth, removeAuth, removeCode])

  if (isAuth) {
    return <Outlet />
  } else {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />
  }
}
