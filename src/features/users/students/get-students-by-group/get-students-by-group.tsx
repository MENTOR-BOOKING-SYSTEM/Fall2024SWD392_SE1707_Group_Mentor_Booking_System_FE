import { Avatar } from '@nextui-org/avatar'
import { useGetStudentsByGroup } from './use-get-students-by-group'
import { useAuth } from '@/hooks/use-auth'
import { Chip } from '@nextui-org/chip'
import { Select, SelectItem } from '@nextui-org/select'
import { Skeleton } from '@nextui-org/skeleton'

interface GetStudentsByGroupProps {
  onChange: (...event: any[]) => void
}

export default function GetStudentsByGroup({ onChange }: GetStudentsByGroupProps) {
  const { user } = useAuth()
  const { data, isLoading } = useGetStudentsByGroup(user?.user_id || '')

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
        isMultiline={true}
        selectionMode='multiple'
        placeholder='Select collaborators'
        onChange={(e) => onChange([...e.target.value.split(',')])}
        classNames={{
          trigger: 'min-h-12 py-2'
        }}
        aria-label='select'
        scrollShadowProps={{ isEnabled: false }}
        disabledKeys={['0']}
        renderValue={(items) => {
          return (
            <div className='flex flex-wrap gap-2'>
              {items.map((item) => (
                <Chip color='primary' className='text-white' key={item.key}>
                  {item.data?.username}
                </Chip>
              ))}
            </div>
          )
        }}
      >
        {(user) => (
          <SelectItem key={user.userID} textValue={user.username}>
            <div className='flex gap-2 items-center'>
              <Avatar alt={user.username} className='flex-shrink-0' size='sm' src={user.avatarUrl} />
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
