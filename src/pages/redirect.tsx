import { Navigate } from 'react-router-dom'

export default function Redirect() {
  const userRole = 'student'

  if (userRole === 'student') {
    return <Navigate to='/1/boards' replace />
  }

  return <div>Home</div>
}
