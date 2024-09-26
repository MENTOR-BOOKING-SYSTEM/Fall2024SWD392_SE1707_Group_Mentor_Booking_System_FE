import { Avatar } from '@nextui-org/avatar'

export default function ViewCurrentProject() {
  return (
    <div className='flex items-center gap-3 px-6 my-4'>
      <Avatar isBordered color='primary' radius='md' src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
      <div className='flex flex-col gap-0.5 w-40'>
        <p className='font-semibold truncate'>Mentor Booking System</p>
        <p className='text-sm'>Sofware project</p>
      </div>
    </div>
  )
}
