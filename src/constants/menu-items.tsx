import { PRIVATE_ROUTES } from '@/routes/routes'
import {
  BoxIcon,
  CalendarDays,
  ChartBarBig,
  Clock,
  Columns3,
  Database,
  FolderClock,
  Hourglass,
  Icon,
  LogOut,
  NotepadText,
  Rows2,
  Settings,
  User,
  UserCogIcon,
  Users
} from 'lucide-react'
import type { DropdownMenuItem, SidebarMenuItem } from '@/models/ui.model'

// Sidebar
export const IS_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
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
  }
]

export const BS_SIDEBAR_MENU_ITEMS: { [key: string]: SidebarMenuItem[] } = {
  GENERAL: [
    {
      id: 1,
      title: 'Submission',
      value: 'submission',
      url: PRIVATE_ROUTES.SUBMISSION.path,
      icon: (className?: string) => <Clock className={className} />
    }
  ],
  STUDENT: [
    {
      id: 2,
      title: 'Group',
      value: 'group',
      url: PRIVATE_ROUTES.GROUP.path,
      icon: (className?: string) => <Users className={className} />
    },
    {
      id: 3,
      title: 'Posts',
      value: 'posts',
      url: PRIVATE_ROUTES.POSTS.path,
      icon: (className?: string) => <NotepadText className={className} />
    },
    {
      id: 4,
      title: 'Create group',
      value: 'Create group',
      url: PRIVATE_ROUTES.CREATE_GROUP.path,
      icon: (className?: string) => <BoxIcon className={className} />
    },
    {
      id: 5,
      title: 'View group',
      value: 'View group',
      url: PRIVATE_ROUTES.VIEW_GROUP.path,
      icon: (className?: string) => <BoxIcon className={className} />
    }
  ],
  MENTOR: [
    {
      id: 4,
      title: 'Review',
      value: 'review',
      url: PRIVATE_ROUTES.REVIEW.path,
      icon: (className?: string) => <Hourglass className={className} />
    }
  ],
  REVIEWER: [],
  MANAGER: [
    {
      id: 5,
      title: 'Assign Reviewers',
      value: 'reviewers',
      url: PRIVATE_ROUTES.REVIEWERS.path,
      icon: (className?: string) => <Users className={className} />
    },
    {
      id: 6,
      title: 'Approval Criterias',
      value: 'approval-criterias',
      url: PRIVATE_ROUTES.APPROVAL_CRITERIAS.path,
      icon: (className?: string) => <Database className={className} />
    }
  ],
  BUSINESS: []
}

export const ADMIN_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    id: 1,
    title: 'Dashboard',
    value: 'dashboard',
    url: PRIVATE_ROUTES.DASHBOARD.path,
    icon: (className?: string) => <ChartBarBig className={className} />
  },
  {
    id: 2,
    title: 'Accounts',
    value: 'accounts',
    url: PRIVATE_ROUTES.ACCOUNT.path,
    icon: (className?: string) => <UserCogIcon className={className} />
  },
  {
    id: 3,
    title: 'Semesters',
    value: 'semesters',
    url: PRIVATE_ROUTES.SEMESTERS.path,
    icon: (className?: string) => <Rows2 className={className} />
  },
  {
    id: 4,
    title: 'Timestamps',
    value: 'timestamps',
    url: PRIVATE_ROUTES.TIMESTAMPS.path,
    icon: (className?: string) => <FolderClock className={className} />
  }
]

export const MANAGER_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = []

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
