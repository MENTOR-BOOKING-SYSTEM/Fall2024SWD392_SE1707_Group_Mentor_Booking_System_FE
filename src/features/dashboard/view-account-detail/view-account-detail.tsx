import { Account } from '@/models/user.model'
import { Avatar } from '@nextui-org/avatar'

interface ViewAccountDetailProps {
  account: Account | undefined
}

export default function ViewAccountDetail({ account }: ViewAccountDetailProps) {
  return (
    <div className='flex flex-col gap-3'>
      <Avatar className='w-20 h-20 mx-auto' isBordered color='primary' src={account?.avatarUrl || ''} />
      <div className='flex flex-col gap-1'>
        <p className='text-center text-xl font-semibold'>{`${account?.firstName} ${account?.lastName}`}</p>
        <p className='text-center text-lg text-default-500'>{account?.email}</p>
      </div>
    </div>
  )
}
