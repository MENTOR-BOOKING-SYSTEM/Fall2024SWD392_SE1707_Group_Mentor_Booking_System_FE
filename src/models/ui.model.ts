export interface SidebarMenuItem {
  id: number
  title: string
  value: string
  url: string
  icon?: (className?: string) => JSX.Element
}

export interface DropdownMenuItem {
  label: string
  key: string
  shortcut?: string
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  icon?: (className?: string) => JSX.Element
  url?: string
  iconPosition?: 'start' | 'end'
  showDivider?: boolean
  sections?: DropdownMenuItem[]
}
