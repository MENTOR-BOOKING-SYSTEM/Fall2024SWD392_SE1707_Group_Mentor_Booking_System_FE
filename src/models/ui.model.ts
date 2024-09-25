export interface SidebarMenuItem {
  id: number
  title: string
  value: string
  url: string
  icon?: (className: string) => JSX.Element
}
