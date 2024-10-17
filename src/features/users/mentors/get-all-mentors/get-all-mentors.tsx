import { Select, SelectItem } from '@nextui-org/select'
import { useGetAllMentors } from './use-get-all-mentors'
import { Skeleton } from '@nextui-org/skeleton'
import { Avatar } from '@nextui-org/avatar'
import { Chip } from '@nextui-org/chip'

interface GetAllMentorsProps {
  onChange: (...event: any[]) => void
  isMultiline?: boolean
  isForMentor?: boolean
}

export default function GetAllMentors({ onChange, isMultiline, isForMentor }: GetAllMentorsProps) {
  const { data, isLoading } = useGetAllMentors()

  if (isLoading) {
    return (
      <Skeleton className='w-full rounded-lg'>
        <div className='h-12 w-full rounded-lg bg-default-300'></div>
      </Skeleton>
    )
  } else if (data) {
    return (
      <Select
        items={data}
        classNames={{
          trigger: 'min-h-12 py-2'
        }}
        scrollShadowProps={{ isEnabled: false }}
        isMultiline={isMultiline}
        aria-label='select'
        selectionMode={isMultiline ? 'multiple' : 'single'}
        placeholder={isForMentor ? 'Select collaborators' : 'Select mentor'}
        disabledKeys={['0']}
        onChange={(e) => onChange([...e.target.value.split(',')])}
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
        {(user) => (
          <SelectItem key={user.userID} textValue={user.username}>
            <div className='flex gap-2 items-center'>
              <Avatar alt={user.username} className='flex-shrink-0' size='sm' src={user.avatarUrl || ''} />
              <div className='flex flex-col'>
                <span className='text-small'>{user.username}</span>
                <span className='text-tiny text-default-400'>{user.email}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    )
  }
}
