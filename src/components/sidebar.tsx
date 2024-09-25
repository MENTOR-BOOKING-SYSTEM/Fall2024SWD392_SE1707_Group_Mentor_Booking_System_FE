import { STUDENT_SIDEBAR_MENU_ITEMS } from '@/constants/menu-items'
import { cn } from '@/utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { SidebarMenuItem } from '@/models/ui.model'

interface SidebarItemProps {
  item: SidebarMenuItem
  isCurrentPath: boolean
}

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <div className='flex flex-col gap-2 p-3.5 w-64'>
      <p className='text-xs font-bold mb-2 px-6'>PLANNING</p>
      {STUDENT_SIDEBAR_MENU_ITEMS.map((item) => {
        const isCurrentPath = pathname.split('/')[2] === item.value
        return <SidebarItem key={item.id} item={item} isCurrentPath={isCurrentPath} />
      })}
    </div>
  )
}

function SidebarItem({ item, isCurrentPath }: SidebarItemProps) {
  const navigate = useNavigate()
  return (
    <div
      key={item.id}
      className={cn(
        'flex items-center gap-4 px-6 py-2 rounded-lg cursor-pointer hover:bg-default-50',
        isCurrentPath ? 'bg-primary-50' : ''
      )}
      onClick={() => navigate(item.url)}
    >
      {item.icon ? item.icon(cn('w-6 h-6', isCurrentPath ? 'text-primary' : 'text')) : null}
      <p className={cn('text-sm', isCurrentPath ? 'text-primary font-medium' : '')}>{item.title}</p>
    </div>
  )
}
