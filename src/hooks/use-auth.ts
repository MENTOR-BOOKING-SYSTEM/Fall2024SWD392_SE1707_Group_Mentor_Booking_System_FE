import { AuthModel } from '@/models/base.model'
import { useLocalStorage } from 'usehooks-ts'
import { Token, useTokens } from './use-tokens'

export const useAuth = (): { isAuth: boolean; user: Token | null } => {
  const [auth] = useLocalStorage<AuthModel>('auth', { accessToken: '', refreshToken: '' })

  if (!auth.accessToken && !auth.refreshToken) return { isAuth: false, user: null }

  const tokens = useTokens([auth.accessToken, auth.refreshToken], true)

  if (tokens.length > 0 && tokens[0] && tokens[1]) {
    return { isAuth: true, user: tokens[0] }
  } else if (!tokens[0] && tokens[1]) {
    // TODO: Refresh the token
    return { isAuth: false, user: null }
  } else {
    // TODO: Logout the user when both tokens invalid
    return { isAuth: false, user: null }
  }
}
