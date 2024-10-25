import { useGetAllTechonologies } from './use-get-all-technologies'
import { Skeleton } from '@nextui-org/skeleton'
import { Select, SelectItem, SelectSection } from '@nextui-org/select'
import { Chip } from '@nextui-org/chip'

interface GetAllTechnologiesProps {
  onChange: (...event: any[]) => void
}

export default function GetAllTechnologies({ onChange }: GetAllTechnologiesProps) {
  const { data, isLoading } = useGetAllTechonologies()

  if (isLoading) {
    return (
      <Skeleton className='w-full rounded-lg'>
        <div className='h-12 w-full rounded-lg bg-default-300'></div>
      </Skeleton>
    )
  } else if (data && data.length > 0) {
    const transformedData = data
      .filter((tech) => !tech.parentID)
      .map((parentTech) => ({
        ...parentTech,
        children: data.filter((tech) => tech.parentID === parentTech.techID)
      }))

    return (
      <Select
        items={data}
        isMultiline={true}
        selectionMode='multiple'
        placeholder='Select your project catergories here'
        label='Technologies (optional)'
        classNames={{
          trigger: 'min-h-12 py-2'
        }}
        aria-label='select'
        onChange={(e) => {
          const convertedTechs = e.target.value.split(',').map((tech) => parseInt(tech))
          onChange(convertedTechs)
        }}
        disabledKeys={['0']}
        scrollShadowProps={{ isEnabled: false }}
        renderValue={(items) => {
          return (
            <div className='flex flex-wrap gap-2'>
              {items.map((item) => (
                <Chip color='primary' className='text-white' key={item.key}>
                  {item.textValue}
                </Chip>
              ))}
            </div>
          )
        }}
      >
        {transformedData.map((section) => (
          <SelectSection showDivider key={section.techID} title={section.techName}>
            {section.children.map((child) => (
              <SelectItem key={child.techID} value={child.techID}>
                {child.techName}
              </SelectItem>
            ))}
          </SelectSection>
        ))}
      </Select>
    )
  }
}
