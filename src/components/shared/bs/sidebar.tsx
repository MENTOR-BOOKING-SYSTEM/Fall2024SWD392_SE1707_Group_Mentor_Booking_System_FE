import ViewCurrentProject from '@/features/projects/view-current-project/view-current-project'
import { cn, isAllowRoles } from '@/utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { ROLES } from '@/constants'
import type { SidebarMenuItem } from '@/models/ui.model'

interface SidebarItemProps {
  item: SidebarMenuItem
  isCurrentPath: boolean
}

interface BSSidebarProps {
  items: SidebarMenuItem[]
}

export default function BSSidebar({ items }: BSSidebarProps) {
  const { pathname } = useLocation()
  const { user } = useAuth()

  return (
    <div className='flex flex-col gap-2'>
      {isAllowRoles([ROLES.STUDENT], user) ? <ViewCurrentProject /> : null}
      {items.map((item) => {
        const isCurrentPath = pathname.split('/')[1] === item.value
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
