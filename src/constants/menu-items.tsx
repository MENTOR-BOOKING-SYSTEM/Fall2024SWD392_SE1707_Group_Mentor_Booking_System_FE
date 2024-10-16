import { PRIVATE_ROUTES } from '@/routes/routes'
import {
  CalendarClock,
  CalendarDays,
  ChartBarBig,
  Columns3,
  Database,
  LogOut,
  Settings,
  User,
  Users
} from 'lucide-react'
import type { DropdownMenuItem, SidebarMenuItem } from '@/models/ui.model'

// Sidebar
export const STUDENT_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    id: 1,
    title: 'Timeline',
    value: 'timeline',
    url: PRIVATE_ROUTES.TIMELINE.path,
    icon: (className?: string) => <ChartBarBig className={className} />
  },
  {
    id: 2,
    title: 'Backlog',
    value: 'backlog',
    url: PRIVATE_ROUTES.BACKLOG.path,
    icon: (className?: string) => <Database className={className} />
  },
  {
    id: 3,
    title: 'Boards',
    value: 'boards',
    url: PRIVATE_ROUTES.BOARDS.path,
    icon: (className?: string) => <Columns3 className={className} />
  },
  {
    id: 4,
    title: 'Calendar',
    value: 'calendar',
    url: PRIVATE_ROUTES.CALENDAR.path,
    icon: (className?: string) => <CalendarDays className={className} />
  },
  {
    id: 5,
    title: 'Members',
    value: 'members',
    url: PRIVATE_ROUTES.MEMBERS.path,
    icon: (className?: string) => <Users className={className} />
  },
  {
    id: 6,
    title: 'Semesters',
    value: 'semesters',
    url: PRIVATE_ROUTES.SEMESTERS.path,
    icon: (className?: string) => <CalendarClock className={className} />
  }
]

export const MENTOR_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = []
export const ADMIN_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = []
export const BUSINESS_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = []

// Dropdown
export const ProfileDropdownMenuItems = (logout: () => void): DropdownMenuItem[] => [
  {
    label: 'Account',
    key: 'account',
    showDivider: true,
    sections: [
      {
        label: 'Profile',
        key: 'profile',
        icon: (className?: string) => <User className={className} />,
        iconPosition: 'start',
        url: PRIVATE_ROUTES.ME.path
      },
      {
        label: 'Settings',
        key: 'settings',
        icon: (className?: string) => <Settings className={className} />,
        iconPosition: 'start'
      }
    ]
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: (className?: string) => <LogOut className={className} />,
    onClick: () => logout(),
    iconPosition: 'start',
    color: 'danger'
  }
]
