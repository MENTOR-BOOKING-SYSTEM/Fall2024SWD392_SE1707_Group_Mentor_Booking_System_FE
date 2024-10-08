import { jwtDecode, JwtPayload } from 'jwt-decode'

export const useTokens = (tokens: string[], isReturnPayload?: boolean) => {
  try {
    const result: (boolean | JwtPayload)[] = []
    tokens.forEach((token) => {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000
      if (decodedToken && decodedToken?.exp && decodedToken?.exp < currentTime) {
        result.push(false)
      } else {
        if (isReturnPayload) {
          result.push(decodedToken)
        } else {
          result.push(true)
        }
      }
    })
    return result
  } catch (error) {
    console.log(error)
    return []
  }
}
