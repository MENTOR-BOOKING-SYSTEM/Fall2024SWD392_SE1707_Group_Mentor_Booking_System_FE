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

interface DropdownProps<T> {
  children: React.ReactNode
  dropdownItems: DropdownMenuItem[]
  backdrop?: 'transparent' | 'opaque' | 'blur'
  params?: Record<keyof T, any>
}

export default function Dropdown<T>({ dropdownItems, children, backdrop, params }: DropdownProps<T>) {
  const navigate = useNavigate()

  const handleClick = (item: DropdownMenuItem) => {
    if (item.url) {
      navigate(item.url)
    } else if (item.onClick) {
      item.onClick(params)
    }
  }

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
                    textValue='text'
                    startContent={section.icon ? section.icon('w-5 h-5') : null}
                    color={section.color}
                    onClick={() => handleClick(item)}
                  >
                    <p>{section.label}</p>
                  </DropdownItem>
                ))}
              </DropdownSection>
            )
          } else {
            return (
              <DropdownItem
                className={cn('my-1', item.color === 'danger' ? 'text-danger' : '')}
                key={item.key}
                textValue='text'
                startContent={item.icon ? item.icon('w-5 h-5') : null}
                color={item.color}
                onClick={() => handleClick(item)}
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
