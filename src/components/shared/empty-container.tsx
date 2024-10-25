import { cn } from '@/utils'
import { PackageOpen } from 'lucide-react'

interface EmptyContainerProps {
  className?: string
  text?: React.ReactNode
}

export default function EmptyContainer({
  className,
  text = <p className='font-medium text-default-300'>No data available</p>
}: EmptyContainerProps) {
  return (
    <div className='flex flex-col items-center gap-2'>
      <PackageOpen className={cn('w-10 h-10 stroke-1 text-default-300', className)} />
      {text}
    </div>
  )
}
