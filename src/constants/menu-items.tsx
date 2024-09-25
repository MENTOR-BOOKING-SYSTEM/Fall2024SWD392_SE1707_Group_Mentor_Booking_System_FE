import { SidebarMenuItem } from '@/models/ui.model'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { CalendarDays, ChartBarBig, Columns3, Database, Users } from 'lucide-react'

export const STUDENT_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    id: 1,
    title: 'Timeline',
    value: 'timeline',
    url: PRIVATE_ROUTES.TIMELINE,
    icon: (className: string) => <ChartBarBig className={className} />
  },
  {
    id: 2,
    title: 'Backlog',
    value: 'backlog',
    url: PRIVATE_ROUTES.BACKLOG,
    icon: (className: string) => <Database className={className} />
  },
  {
    id: 3,
    title: 'Boards',
    value: 'boards',
    url: PRIVATE_ROUTES.BOARDS,
    icon: (className: string) => <Columns3 className={className} />
  },
  {
    id: 4,
    title: 'Calendar',
    value: 'calendar',
    url: PRIVATE_ROUTES.CALENDAR,
    icon: (className: string) => <CalendarDays className={className} />
  },
  {
    id: 5,
    title: 'Members',
    value: 'members',
    url: PRIVATE_ROUTES.MEMBERS,
    icon: (className: string) => <Users className={className} />
  }
]

export const MENTOR_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = []
export const ADMIN_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = []
export const BUSINESS_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = []
