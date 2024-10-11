import Select from '@/components/ui/select'

interface GetStudentsByGroupProps {
  onChange: (...event: any[]) => void
}

export default function GetStudentsByGroup({ onChange }: GetStudentsByGroupProps) {
  return (
    <Select
      selectItems={[{ key: '0', label: 'No students found' }]}
      classNames={{
        trigger: 'min-h-12 py-2'
      }}
      isMultiline={true}
      selectionMode='multiple'
      variant='bordered'
      placeholder='Select collaborators'
      disabledKeys={['0']}
      onChange={(e) => onChange([...e.target.value.split(',')])}
      isChip
    />
  )
}
