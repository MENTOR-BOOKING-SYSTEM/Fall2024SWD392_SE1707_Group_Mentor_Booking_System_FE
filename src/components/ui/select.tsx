import { SelectMenuItem } from '@/models/ui.model'
import { Chip, Select as NextSelect, SelectProps as NextSelectProps, SelectItem } from '@nextui-org/react'
import { useState } from 'react'

interface SelectProps extends Omit<NextSelectProps, 'children'> {
  selectItems: SelectMenuItem[] | undefined
  defaultSelectedKeys?: string[]
  className?: string
  label?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  isChip?: boolean
  onClick?: () => void
}

export default function Select({
  selectItems,
  className,
  onClick,
  size = 'sm',
  isChip = false,
  ...props
}: SelectProps) {
  const [value, setValue] = useState([selectItems ? selectItems[0]['key'] : ''])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectItems?.forEach((item) => {
      if (item.key === e.target.value && item.onClick) {
        item.onClick()
      }
    })
  }

  if (selectItems && selectItems.length > 0) {
    return (
      <NextSelect
        className={className}
        items={selectItems}
        disableSelectorIconRotation
        aria-label='select'
        size={size}
        onChange={handleSelectChange}
        renderValue={(items) => {
          return (
            <div className='flex flex-wrap gap-2'>
              {items.map((item) => {
                const menuItem = item.data as SelectMenuItem
                if (isChip) {
                  return (
                    <Chip key={item.key} color='primary'>
                      {menuItem.label}
                    </Chip>
                  )
                } else {
                  return <p key={item.key}>{menuItem.label}</p>
                }
              })}
            </div>
          )
        }}
        {...props}
      >
        {(item) => {
          const menuItem = item as SelectMenuItem
          return <SelectItem key={menuItem.key}>{menuItem.label}</SelectItem>
        }}
      </NextSelect>
    )
  }
}
