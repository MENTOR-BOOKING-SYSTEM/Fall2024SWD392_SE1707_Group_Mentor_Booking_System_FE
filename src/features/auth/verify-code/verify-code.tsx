import { CodeModel } from '@/models/base.model'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { Spinner } from '@nextui-org/react'
import { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { useVerifyCode } from './use-verify-code'

export default function VerifyCode() {
  const [searchParams] = useSearchParams()
  const [_code, setCode] = useLocalStorage<CodeModel>('code', { code: '' })
  const code = searchParams.get('code')

  const { isLoading, isError } = useVerifyCode(code || '')

  useEffect(() => {
    if (code) {
      setCode({ code })
    }
  }, [code, setCode])

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <Navigate to={PUBLIC_ROUTES.FORGOT_PASSWORD} replace />
  } else {
    return <Navigate to={PUBLIC_ROUTES.RESET_PASSWORD} replace />
  }
}
