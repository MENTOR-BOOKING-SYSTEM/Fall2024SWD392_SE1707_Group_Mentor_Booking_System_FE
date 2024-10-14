import Select from '@/components/ui/select'
import { useGetAllTechonologies } from './use-get-all-technologies'
import { Skeleton } from '@nextui-org/skeleton'

interface GetAllTechnologiesProps {
  onChange?: (...event: any[]) => void
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
    const convertedData = data
      .filter((item) => item.parentID)
      .map((item) => ({ key: item.techID, label: item.techName }))

    return (
      <Select
        selectItems={convertedData}
        className='max-w-screen-xl'
        classNames={{
          base: 'max-w-xs',
          trigger: 'min-h-12 py-2'
        }}
        isMultiline={true}
        selectionMode='multiple'
        placeholder='Select technologies'
        onChange={onChange}
        isChip
      />
    )
  }
}
