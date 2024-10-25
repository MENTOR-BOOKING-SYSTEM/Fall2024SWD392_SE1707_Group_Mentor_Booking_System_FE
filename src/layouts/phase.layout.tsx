import { useUser } from '@/hooks/use-user'
import { Navigate, Outlet } from 'react-router-dom'

interface PhaseLayoutProps {
  allowPhases: string[]
  customErrorPage?: React.ReactNode
  children?: React.ReactNode
}

export default function PhaseLayout({ allowPhases, customErrorPage, children }: PhaseLayoutProps) {
  const {
    currentPhase: { currentPhase }
  } = useUser()

  if (currentPhase && allowPhases.some((phase) => currentPhase.includes(phase))) {
    return children || <Outlet />
  } else {
    if (customErrorPage) {
      return customErrorPage
    } else {
      return <Navigate to='/404' replace />
    }
  }
}
