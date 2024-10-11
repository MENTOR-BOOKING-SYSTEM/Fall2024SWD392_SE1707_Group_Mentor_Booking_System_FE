import Select from '@/components/ui/select'
import { useGetAllTechonologies } from './use-get-all-technologies'
import { Skeleton } from '@nextui-org/skeleton'
import { SelectMenuItem, TechnologyModel } from '@/models/ui.model'

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
  } else {
    const techMap = new Map<string, TechnologyModel>()
    data?.forEach((tech) => {
      if (!tech.parentID) {
        techMap.set(tech.techID, { ...tech, sections: [] })
      }
    })
    data?.forEach((item) => {
      if (item.parentID !== null) {
        const parent = techMap.get(item.parentID)
        if (parent) {
          parent.sections?.push(item)
        }
      }
    })

    const convertedData: SelectMenuItem[] =
      Array.from(techMap.values()).length > 0
        ? Array.from(techMap.values()).map((tech) => ({
            key: String(tech.techID),
            label: tech.techName,
            sections: tech.sections?.map((section) => ({ key: String(section.techID), label: section.techName }))
          }))
        : [{ key: '0', label: 'No technologies found' }]
    return (
      <Select
        selectItems={convertedData}
        classNames={{
          trigger: 'min-h-12 py-2'
        }}
        isMultiline={true}
        selectionMode='multiple'
        variant='bordered'
        placeholder='Select technologies'
        disabledKeys={['0']}
        onChange={(e) => onChange([...e.target.value.split(',')])}
        isChip
      />
    )
  }
}
