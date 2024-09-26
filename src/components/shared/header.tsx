import Dropdown from '../ui/dropdown'
import Meetup from '/meetup.svg'
import Modal from '../ui/modal'
import { Avatar } from '@nextui-org/avatar'
import { Input } from '@nextui-org/input'
import { Bell, Search } from 'lucide-react'
import { PROFILE_DROPDOWN_MENU_ITEMS } from '@/constants/menu-items'
import { Divider } from '@nextui-org/divider'
import { Link } from 'react-router-dom'
import { PRIVATE_ROUTES } from '@/routes/routes'

export default function Header() {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center gap-3 px-3.5 h-16'>
        <Link to={PRIVATE_ROUTES.ROOT}>
          <div className='flex items-center gap-1.5'>
            <img src={Meetup} alt='Meetup' className='w-12 h-12' />
            <p className='font-squada font-semibold text-2xl tracking-wider text-default-800'>Meetup</p>
          </div>
        </Link>
        <div className='flex items-center gap-2'>
          <Modal>Create</Modal>
          <Input
            type='text'
            placeholder='you@example.com'
            className='flex-1'
            labelPlacement='outside'
            startContent={<Search className='text-default-400 pointer-events-none flex-shrink-0' />}
          />
          <Dropdown dropdownItems={[]}>
            <Bell className='text-default-400 cursor-pointer stroke-1' />
          </Dropdown>
          <Dropdown dropdownItems={PROFILE_DROPDOWN_MENU_ITEMS}>
            <Avatar
              className='cursor-pointer'
              isBordered
              color='primary'
              src='https://i.pravatar.cc/150?u=a04258a2462d826712d'
            />
          </Dropdown>
        </div>
      </div>
      <Divider />
    </div>
  )
}
