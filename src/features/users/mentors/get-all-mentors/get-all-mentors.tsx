import Select from '@/components/ui/select'

interface GetAllMentorsProps {
  onChange: (...event: any[]) => void
}

export default function GetAllMentors({ onChange }: GetAllMentorsProps) {
  return (
    <Select
      selectItems={[{ key: '0', label: 'No mentors found' }]}
      classNames={{
        trigger: 'min-h-12 py-2'
      }}
      scrollShadowProps={{ isEnabled: false }}
      isMultiline={true}
      aria-label='select'
      selectionMode='multiple'
      placeholder='Select mentor email'
      disabledKeys={['0']}
      onChange={(e) => onChange([...e.target.value.split(',')])}
      isChip
    />
  )
}
