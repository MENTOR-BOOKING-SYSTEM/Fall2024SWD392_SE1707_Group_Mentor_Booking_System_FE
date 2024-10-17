import { cn } from '@/utils'
import { Chip } from '@nextui-org/chip'

export default function Footer() {
  const appMode: string = import.meta.env.APP_MODE

  return (
    <div
      className={cn('p-2 text-center font-semibold', appMode === 'development' ? 'bg-primary-300' : 'bg-warning-300')}
    >
      <Chip color={appMode === 'development' ? 'primary' : 'warning'} variant='shadow'>
        <p className='font-bold text-white'>{appMode.toUpperCase()} ENVIRONMENT</p>
      </Chip>
    </div>
  )
}
