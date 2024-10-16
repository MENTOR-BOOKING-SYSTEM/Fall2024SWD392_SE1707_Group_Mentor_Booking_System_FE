import { useTokens } from '@/hooks/use-tokens'
import { AuthModel } from '@/models/base.model'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

export default function AuthRedirect() {
  const [searchParams] = useSearchParams()
  const [_auth, setAuth] = useLocalStorage<AuthModel>('auth', { accessToken: '', refreshToken: '' })
  const navigate = useNavigate()
  const accessToken = searchParams.get('accessToken')
  const refreshToken = searchParams.get('refreshToken')

  useEffect(() => {
    if (accessToken && refreshToken) {
      const tokens = useTokens([accessToken, refreshToken], true)
      if (tokens.length > 0 && tokens[0] && tokens[1]) {
        setAuth({ accessToken, refreshToken })
      } else {
        navigate(PUBLIC_ROUTES.LOGIN)
      }
    } else {
      navigate(PUBLIC_ROUTES.LOGIN)
    }
  }, [accessToken, refreshToken, setAuth])

  return null
}
