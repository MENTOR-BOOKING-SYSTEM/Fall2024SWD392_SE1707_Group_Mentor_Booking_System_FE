import Button from '../../ui/button'
import Dropdown from '../../ui/dropdown'
import Meetup from '/meetup.svg'
import { ProfileDropdownMenuItems } from '@/constants/menu-items'
import { useLogout } from '@/features/auth/logout/use-logout'
import { useUser } from '@/hooks/use-user'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { Avatar } from '@nextui-org/avatar'
import { Divider } from '@nextui-org/divider'
import { Bell, CirclePlus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BSHeader() {
  const { mutate: logout } = useLogout()
  const { currentUserInfo } = useUser()

  if (currentUserInfo) {
    return (
      <div className='flex flex-col'>
        <div className='flex justify-between items-center gap-3 px-3.5 h-16'>
          <Link to={PRIVATE_ROUTES.ROOT.path}>
            <div className='flex items-center gap-1.5'>
              <img src={Meetup} alt='Meetup' className='w-12 h-12' />
              <p className='font-squada font-semibold text-2xl tracking-wider text-default-800'>Meetup</p>
            </div>
          </Link>
          <div className='flex items-center gap-3'>
            {!currentUserInfo.groupID ? (
              <Button color='primary' startContent={<CirclePlus className='w-4 h-4' />}>
                Create group
              </Button>
            ) : null}
            <Dropdown dropdownItems={[]}>
              <Bell className='text-default-400 cursor-pointer stroke-1' />
            </Dropdown>
            <Dropdown dropdownItems={ProfileDropdownMenuItems(logout)}>
              <Avatar
                className='cursor-pointer'
                isBordered
                color='primary'
                src={currentUserInfo.avatarUrl || undefined}
              />
            </Dropdown>
          </div>
        </div>
        <Divider />
      </div>
    )
  }
}
