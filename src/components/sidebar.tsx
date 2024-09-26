import ViewCurrentProject from '@/features/projects/view-current-project/view-current-project'
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
    <div className='flex flex-col gap-2 px-3.5 w-72'>
      <ViewCurrentProject />
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
        'flex items-center gap-4 px-6 py-2 rounded-lg cursor-pointer hover:bg-default-100',
        isCurrentPath ? 'bg-primary-50' : ''
      )}
      onClick={() => navigate(item.url)}
    >
      {item.icon ? item.icon(cn('w-6 h-6 stroke-1', isCurrentPath ? 'text-primary' : 'text')) : null}
      <p className={cn('font-medium', isCurrentPath ? 'text-primary' : '')}>{item.title}</p>
    </div>
  )
}
