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
import searchUserService, { SearchUserResult } from '@/services/search-user.services'
import GroupForm from './group-form'
import { useFormContext } from 'react-hook-form'
import { GroupFormValues } from './use-create-group'

export default function CreateGroupForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<GroupFormValues>()
  const [filterValue, setFilterValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasSearched, setHasSearched] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<SearchUserResult[]>([])
  const [availableUsers, setAvailableUsers] = React.useState<SearchUserResult[]>([])
  const [allUsers, setAllUsers] = React.useState<SearchUserResult[]>([])
  const [removedUsers, setRemovedUsers] = React.useState<SearchUserResult[]>([])
  const maxUsers = 4
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleSearch = React.useCallback(
    (value: string) => {
      setFilterValue(value)

      if (value.trim() === '') {
        setAvailableUsers([])
        setHasSearched(false)
        setIsLoading(false)
        return
      }

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }

      setIsLoading(true)
      setAvailableUsers([])

      searchTimeoutRef.current = setTimeout(async () => {
        if (!value) {
          setAvailableUsers([])
          setIsLoading(false)
          setHasSearched(false)
          return
        }

        setHasSearched(true)

        try {
          const result = await searchUserService.searchUsers([1], true, value, false)
          const filteredResult = result.filter((user) => !selectedUsers.some((u) => u.userID === user.userID))

          setAvailableUsers(filteredResult)
          setAllUsers(result)
        } catch (error) {
          console.error('Error searching users:', error)
        } finally {
          setIsLoading(false)
        }
      }, 1000)
    },
    [selectedUsers]
  )

  const handleAddUser = React.useCallback(
    (user: SearchUserResult) => {
      if (selectedUsers.length < maxUsers) {
        setSelectedUsers((prevUsers) => [...prevUsers, user])
        setAvailableUsers((prevUsers) => prevUsers.filter((u) => u.userID !== user.userID))

        setRemovedUsers((prevRemovedUsers) => prevRemovedUsers.filter((u) => u.userID !== user.userID))
      }
    },
    [selectedUsers, maxUsers]
  )

  const handleRemoveUser = React.useCallback((user: SearchUserResult) => {
    setSelectedUsers((prevUsers) => prevUsers.filter((u) => u.userID !== user.userID))
    setRemovedUsers((prevRemovedUsers) => [...prevRemovedUsers, user])
  }, [])

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
            <Button color='primary' onPress={() => handleAddUser(user)} isDisabled={selectedUsers.length >= maxUsers}>
              Add
            </Button>
          )
        default:
          return cellValue
      }
    },
    [isLoading, handleAddUser, selectedUsers.length, maxUsers]
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
        <div className='flex flex-col gap-4'>
          {topContent}
          <div className='h-3'>
            {selectedUsers.length > maxUsers && (
              <p className='text-danger'>Maximum number of members has been reached ({maxUsers})</p>
            )}
          </div>
          <Table
            aria-label='Table with search and loading state'
            isHeaderSticky
            classNames={{
              wrapper: 'max-h-[400px]'
            }}
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
      </div>
      <div className='flex-1'>
        <GroupForm
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          onRemoveUser={handleRemoveUser}
          maxUsers={maxUsers}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  )
}
