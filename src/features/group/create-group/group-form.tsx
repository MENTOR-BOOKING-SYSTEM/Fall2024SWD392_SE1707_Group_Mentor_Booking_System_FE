import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, User, Button } from '@nextui-org/react'
import { columns, users } from './data'

type User = (typeof users)[0]

const updatedColumns = columns.map((column) => (column.uid === 'name' ? { ...column, name: 'AVATAR' } : column))

export default function CreateGroupForm() {
  const [inputValue, setInputValue] = React.useState('')

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User]

    switch (columnKey) {
      case 'name':
        return <User avatarProps={{ radius: 'lg', src: user.avatar }} name='' />
      case 'actions':
        return (
          <Button
            color='danger'
            variant='light'
            isLoading={false}
            onPress={() => console.log('Remove action for', user.name)}
          >
            Remove
          </Button>
        )
      default:
        return cellValue
    }
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            isRequired
            type='group name'
            label="Group's Name"
            labelPlacement='outside-left'
            className='w-full sm:max-w-[44%]'
            placeholder='Type name'
            value={inputValue}
            onClear={() => setInputValue('')}
            onValueChange={(value) => setInputValue(value)}
          />
        </div>
      </div>
    )
  }, [inputValue])

  return (
    <Table
      aria-label='Example table with avatars'
      isHeaderSticky
      classNames={{
        wrapper: 'max-h-[400px]'
      }}
      topContent={topContent}
      topContentPlacement='outside'
    >
      <TableHeader columns={[...updatedColumns.filter((column) => !['id', 'role', 'team'].includes(column.uid))]}>
        {(column) => (
          <TableColumn key={column.uid} align='start'>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  )
}
