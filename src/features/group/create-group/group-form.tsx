import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, User, Button } from '@nextui-org/react'
import { SearchUserResult } from '@/services/search-user.service'

interface GroupFormProps {
  selectedUsers: SearchUserResult[]
  setSelectedUsers: React.Dispatch<React.SetStateAction<SearchUserResult[]>>
  onRemoveUser: (user: SearchUserResult) => void
}

export default function GroupForm({ selectedUsers, setSelectedUsers, onRemoveUser }: GroupFormProps) {
  const [groupName, setGroupName] = React.useState('')

  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'EMAIL', uid: 'email' },
    { name: 'ACTIONS', uid: 'actions' }
  ]

  const handleRemoveUser = (userToRemove: SearchUserResult) => {
    setSelectedUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userToRemove.userID))
    onRemoveUser(userToRemove)
  }

  const renderCell = React.useCallback((user: SearchUserResult, columnKey: React.Key) => {
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
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <Input
        isClearable
        type='text'
        label="Group's Name"
        placeholder='Enter group name'
        value={groupName}
        onValueChange={setGroupName}
      />
      <Table aria-label='Selected users table'>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align='start'>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={selectedUsers}>
          {(item) => (
            <TableRow key={item.userID}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
