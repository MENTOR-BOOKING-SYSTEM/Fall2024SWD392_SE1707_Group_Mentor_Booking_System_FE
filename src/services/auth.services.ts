import axios from 'axios'

class AuthService {
  async login(email: string, password: string) {
    const response = await axios.post('http://localhost:4000/users/login', {
      email,
      password
    })
    return response.data
  }
}

const authService = new AuthService()
export default authService
