import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  User,
  Spinner
} from '@nextui-org/react'
import { SearchIcon } from 'lucide-react'
import searchUserService, { SearchUserResult } from '@/services/search-user.service'
import GroupForm from './group-form'

export default function CreateGroupForm() {
  const [filterValue, setFilterValue] = React.useState('')
  const [filteredItems, setFilteredItems] = React.useState<SearchUserResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasSearched, setHasSearched] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<SearchUserResult[]>([])
  const [availableUsers, setAvailableUsers] = React.useState<SearchUserResult[]>([])

  const handleSearch = React.useCallback(async (value: string) => {
    setFilterValue(value)

    if (!value) {
      setFilteredItems([])
      setIsLoading(false)
      setHasSearched(false)
      return
    }

    setFilteredItems([])
    setHasSearched(true)
    setIsLoading(true)

    try {
      const result = await searchUserService.searchUsers([1], true, value, false)
      setFilteredItems(result)
      setAvailableUsers(result)
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleAddUser = (user: SearchUserResult) => {
    if (!selectedUsers.some((selectedUser) => selectedUser.userID === user.userID)) {
      setSelectedUsers((prevUsers) => [...prevUsers, user])
      setAvailableUsers((prevUsers) => prevUsers.filter((u) => u.userID !== user.userID))
    }
  }

  const handleRemoveUser = (user: SearchUserResult) => {
    setSelectedUsers((prevUsers) => prevUsers.filter((u) => u.userID !== user.userID))
    setAvailableUsers((prevUsers) => [...prevUsers, user])
  }

  const renderCell = React.useCallback(
    (user: SearchUserResult, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof SearchUserResult]

      if (isLoading) {
        return null
      }

      switch (columnKey) {
        case 'name':
          return <User avatarProps={{ radius: 'lg', src: user.avatarUrl || undefined }} name={``} />
        case 'actions':
          return (
            <Button color='primary' onClick={() => handleAddUser(user)}>
              Add
            </Button>
          )
        default:
          return cellValue
      }
    },
    [isLoading]
  )

  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'EMAIL', uid: 'email' },
    { name: 'ACTIONS', uid: 'actions' }
  ]

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Search by email...'
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => handleSearch('')}
            onValueChange={handleSearch}
          />
        </div>
      </div>
    )
  }, [filterValue, handleSearch])

  const loadingState = isLoading ? 'loading' : 'idle'

  return (
    <div className='flex gap-x-4'>
      <div className='flex-1'>
        <Table
          aria-label='Example table with search and loading state'
          isHeaderSticky
          classNames={{
            wrapper: 'max-h-[400px]'
          }}
          topContent={topContent}
          topContentPlacement='outside'
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align='start'>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody
            emptyContent={
              isLoading ? (
                <Spinner />
              ) : !hasSearched ? (
                'Start typing to search...'
              ) : filterValue ? (
                'No users found'
              ) : (
                'No data available'
              )
            }
            items={availableUsers}
            loadingState={loadingState}
            loadingContent={<Spinner />}
          >
            {(item) => (
              <TableRow key={item.userID}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex-1'>
        <GroupForm selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} onRemoveUser={handleRemoveUser} />
      </div>
    </div>
  )
}
