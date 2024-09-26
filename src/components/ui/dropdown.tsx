import { DropdownMenuItem } from '@/models/ui.model'
import {
  Dropdown as NextDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from '@nextui-org/dropdown'
import { cn } from '@nextui-org/theme'
import { useNavigate } from 'react-router-dom'

interface DropdownProps {
  children: React.ReactNode
  dropdownItems: DropdownMenuItem[]
  backdrop?: 'transparent' | 'opaque' | 'blur'
}

export default function Dropdown({ dropdownItems, children, backdrop }: DropdownProps) {
  const navigate = useNavigate()

  return (
    <NextDropdown backdrop={backdrop}>
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu>
        {dropdownItems.map((item) => {
          if (item.sections && item.sections.length > 0) {
            return (
              <DropdownSection key={item.key} title={item.label} showDivider={item.showDivider}>
                {item.sections.map((section) => (
                  <DropdownItem
                    className={cn('my-1', section.color === 'danger' ? 'text-danger' : '')}
                    key={section.key}
                    startContent={section.icon ? section.icon('w-5 h-5') : null}
                    color={section.color}
                    onClick={() => {
                      if (section.url) navigate(section.url)
                    }}
                  >
                    <polyline>{section.label}</polyline>
                  </DropdownItem>
                ))}
              </DropdownSection>
            )
          } else {
            return (
              <DropdownItem
                className={cn('my-1', item.color === 'danger' ? 'text-danger' : '')}
                key={item.key}
                startContent={item.icon ? item.icon('w-5 h-5') : null}
                color={item.color}
                onClick={() => {
                  if (item.url) navigate(item.url)
                }}
              >
                <p>{item.label}</p>
              </DropdownItem>
            )
          }
        })}
      </DropdownMenu>
    </NextDropdown>
  )
}
