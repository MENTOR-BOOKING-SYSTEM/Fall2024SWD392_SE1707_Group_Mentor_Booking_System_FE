import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, User, Button } from '@nextui-org/react'
import { SearchUserResult } from '@/services/search-user.services'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { GroupFormValues } from './use-create-group'

interface GroupFormProps {
  selectedUsers: SearchUserResult[]
  setSelectedUsers: React.Dispatch<React.SetStateAction<SearchUserResult[]>>

  onRemoveUser: (user: SearchUserResult) => void
  maxUsers: number
  register: UseFormRegister<GroupFormValues>
  errors: FieldErrors<GroupFormValues>
}

export default function GroupForm({
  selectedUsers,
  setSelectedUsers,
  onRemoveUser,
  maxUsers,
  register,
  errors
}: GroupFormProps) {
  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'EMAIL', uid: 'email' },
    { name: 'ACTIONS', uid: 'actions' }
  ]

  const handleRemoveUser = (userToRemove: SearchUserResult) => {
    setSelectedUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userToRemove.userID))
    onRemoveUser(userToRemove)
  }

  const renderCell = React.useCallback(
    (user: SearchUserResult, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof SearchUserResult]

      switch (columnKey) {
        case 'name':
          return <User avatarProps={{ radius: 'lg', src: user.avatarUrl || undefined }} name={``} />
        case 'actions':
          return (
            <Button color='danger' variant='light' onPress={() => handleRemoveUser(user)}>
              Remove
            </Button>
          )
        default:
          return cellValue
      }
    },
    [handleRemoveUser]
  )

  return (
    <div className='flex flex-col gap-4'>
      <Input
        {...register('groupName')}
        isClearable
        isRequired
        type='text'
        label='Group'
        labelPlacement='outside-left'
        placeholder='Enter name'
        errorMessage={errors.groupName?.message}
      />
      {errors.groupName && <p className='text-danger text-sm'>{errors.groupName.message}</p>}
      <input type='hidden' {...register('usersID')} value={selectedUsers.map((user) => user.userID).join(',')} />
      <div className='h-3'>
        {selectedUsers.length > maxUsers && (
          <p className='text-danger'>Maximum number of members has been reached ({maxUsers}).</p>
        )}
        {selectedUsers.length < 3 && <p className='text-warning'>Need at least 3 members to create a group</p>}
      </div>
      <Table
        aria-label='Selected users table'
        isHeaderSticky
        classNames={{
          wrapper: 'max-h-[400px]'
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align='start'>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={selectedUsers} emptyContent='Find your members'>
          {(item) => (
            <TableRow key={item.userID}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
