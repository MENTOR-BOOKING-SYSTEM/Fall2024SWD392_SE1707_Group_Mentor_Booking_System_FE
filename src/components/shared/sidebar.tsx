import { cn } from '@/utils'
import { useLocation, useNavigate } from 'react-router-dom'
import type { SidebarMenuItem } from '@/models/ui.model'

interface SidebarItemProps {
  item: SidebarMenuItem
  isCurrentPath: boolean
}

interface SidebarProps {
  items: SidebarMenuItem[]
  children?: React.ReactNode
  urlPositon: number
}

export default function Sidebar({ items, children, urlPositon }: SidebarProps) {
  const { pathname } = useLocation()

  return (
    <div className='flex flex-col gap-2 min-w-72 p-4'>
      {children}
      {items.map((item) => {
        const isCurrentPath = pathname.split('/')[urlPositon] === item.value
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
