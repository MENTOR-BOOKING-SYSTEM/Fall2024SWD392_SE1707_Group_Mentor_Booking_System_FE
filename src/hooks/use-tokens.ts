import { jwtDecode, JwtPayload } from 'jwt-decode'

export interface Token extends JwtPayload {
  user_id: string
  token_type: number
  email: string
}

export const useTokens = (tokens: string[], isReturnPayload?: boolean): (undefined | Token)[] => {
  try {
    const result: (undefined | Token)[] = []
    tokens.forEach((token) => {
      const decodedToken = jwtDecode<Token>(token)
      const currentTime = Date.now() / 1000
      if (decodedToken && decodedToken?.exp && decodedToken?.exp < currentTime) {
        result.push(undefined)
      } else {
        if (isReturnPayload) {
          result.push(decodedToken)
        } else {
          result.push(undefined)
        }
      }
    })
    return result
  } catch (error) {
    console.log(error)
    return []
  }
}
