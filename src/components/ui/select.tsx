import { SelectMenuItem } from '@/models/ui.model'
import {
  Chip,
  Select as NextSelect,
  SelectProps as NextSelectProps,
  SelectItem,
  SelectSection
} from '@nextui-org/react'

interface SelectProps extends Omit<NextSelectProps, 'children'> {
  selectItems: SelectMenuItem[] | undefined
  isChip?: boolean
  onClick?: () => void
}

export default function Select({ selectItems, onClick, isChip = false, ...props }: SelectProps) {
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
        // items={selectItems}
        aria-label='select'
        disableSelectorIconRotation
        onChange={handleSelectChange}
        renderValue={(items) => {
          return (
            <div className='flex flex-wrap gap-2'>
              {items.map((item) => {
                if (isChip) {
                  return (
                    <Chip color='primary' key={item.key}>
                      {item.textValue}
                    </Chip>
                  )
                } else {
                  return <p key={item.key}>{item.textValue}</p>
                }
              })}
            </div>
          )
        }}
        {...props}
      >
        {selectItems.map((item) => {
          if (item.sections && item.sections.length > 0) {
            return (
              <SelectSection key={item.key} title={item.label}>
                {item.sections.map((section) => (
                  <SelectItem key={section.key}>{section.label}</SelectItem>
                ))}
              </SelectSection>
            )
          } else {
            return <SelectItem key={item.key}>{item.label}</SelectItem>
          }
        })}
      </NextSelect>
    )
  }
}
