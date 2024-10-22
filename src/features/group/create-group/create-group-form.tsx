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
import { columns, users } from './data'

type User = (typeof users)[0]

export default function CreateGroupForm() {
  const [filterValue, setFilterValue] = React.useState('')
  const [filteredItems, setFilteredItems] = React.useState<User[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSearch = React.useCallback((value: string) => {
    setFilterValue(value)

    if (!value) {
      // Khi xóa tìm kiếm, không hiển thị dữ liệu nào
      setFilteredItems([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    // Thêm delay để giả lập trạng thái loading
    setTimeout(() => {
      const lowercasedFilter = value.toLowerCase()
      const result = users.filter((user) => user.name.toLowerCase().includes(lowercasedFilter))

      setFilteredItems(result)
      setIsLoading(false)
    }, 1000) // 1 giây delay
  }, [])

  const renderCell = React.useCallback(
    (user: User, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof User]

      if (isLoading) {
        return null // Không hiển thị nội dung khi đang tải
      }

      switch (columnKey) {
        case 'name':
          return <User avatarProps={{ radius: 'lg', src: user.avatar }} name={cellValue} />
        case 'actions':
          return <Button color='primary'>Add</Button>
        default:
          return cellValue
      }
    },
    [isLoading]
  )

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Search by name...'
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
    <Table
      aria-label='Example table with search and loading state'
      isHeaderSticky
      classNames={{
        wrapper: 'max-h-[400px]'
      }}
      topContent={topContent}
      topContentPlacement='outside'
    >
      <TableHeader columns={[...columns.filter((column) => !['id', 'role', 'team', 'Actions'].includes(column.uid))]}>
        {(column) => (
          <TableColumn key={column.uid} align='start'>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={filterValue ? 'No users found' : 'No data available'}
        items={filteredItems}
        loadingState={loadingState}
        loadingContent={<Spinner />}
      >
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  )
}
