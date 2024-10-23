import NotFound from '@/pages/not-found'
import PageLoader from '@/components/shared/page-loader'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'

export default function ErrorLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <NotFound message={error.message} callbackFunc={resetErrorBoundary} />
          )}
          onReset={reset}
        >
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
