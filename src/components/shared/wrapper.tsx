import { cn } from '@/utils'

export default function Wrapper({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('w-full min-h-screen', className)}>{children}</div>
}
