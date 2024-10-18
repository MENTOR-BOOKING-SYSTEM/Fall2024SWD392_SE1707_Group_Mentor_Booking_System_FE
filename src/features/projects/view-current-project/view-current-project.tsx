import ProjectPlaceholder from '/project-placeholder.jpg'
import { UserInfo } from '@/models/user.model'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { Avatar } from '@nextui-org/avatar'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

export default function ViewCurrentProject() {
  const [userInfo] = useLocalStorage<UserInfo>('userInfo', {
    email: '',
    firstName: '',
    lastName: '',
    avatarUrl: null,
    groupID: null,
    projectID: null,
    position: null
  })

  const navigate = useNavigate()

  if (userInfo.projectID) {
    return (
      <div className='flex items-center gap-3 px-6 my-4'>
        <Avatar isBordered color='primary' radius='md' src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
        <div className='flex flex-col gap-0.5 w-40'>
          <p className='font-semibold truncate'>Mentor Booking System</p>
          <p className='text-sm'>Sofware project</p>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className='flex items-center gap-3 px-6 my-4 cursor-pointer'
        onClick={() => navigate(PRIVATE_ROUTES.CHOOSE_PROJECT.path)}
      >
        <Avatar isBordered color='primary' radius='md' src={ProjectPlaceholder} />
        <div className='flex flex-col gap-0.5 w-40'>
          <p className='font-semibold truncate'>Choose project</p>
          <p className='text-sm'>Sofware project</p>
        </div>
      </div>
    )
  }
}
