import PageLoader from '@/components/shared/page-loader'
import { useGetCurrentPhase } from '@/features/semesters/get-current-phase/use-get-current-phase'
import { Navigate, Outlet } from 'react-router-dom'

interface PhaseLayoutProps {
  allowPhases: string[]
  customErrorPage?: React.ReactNode
  children?: React.ReactNode
}

export default function PhaseLayout({ allowPhases, customErrorPage, children }: PhaseLayoutProps) {
  const { data, isLoading } = useGetCurrentPhase()

  if (isLoading) {
    return <PageLoader />
  } else if (data && allowPhases.some((phase) => data.includes(phase))) {
    return children || <Outlet />
  } else {
    if (customErrorPage) {
      return customErrorPage
    } else {
      return <Navigate to='/404' replace />
    }
  }
}
