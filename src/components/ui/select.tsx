import { SelectMenuItem } from '@/models/ui.model'
import { Select as NextSelect, SelectItem } from '@nextui-org/react'
import { useState } from 'react'

interface SelectProps {
  selectItems: SelectMenuItem[]
  defaultSelectedKeys?: string[]
  className?: string
  label?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export default function Select({ selectItems, className, onClick, size = 'sm', ...props }: SelectProps) {
  const [value, setValue] = useState([selectItems[0]['key']])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue([e.target.value])
    selectItems.forEach((item) => {
      if (item.key === e.target.value && item.onClick) {
        item.onClick()
      }
    })
  }

  return (
    <NextSelect
      className={className}
      disableSelectorIconRotation
      selectedKeys={value}
      onChange={handleSelectChange}
      onClick={(e) => console.log(e.target)}
      aria-label='select'
      size={size}
      disallowEmptySelection
      {...props}
    >
      {selectItems.map((item) => (
        <SelectItem key={item.key}>{item.label}</SelectItem>
      ))}
    </NextSelect>
  )
}
