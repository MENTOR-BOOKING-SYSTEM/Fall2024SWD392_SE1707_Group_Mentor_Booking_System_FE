import React, { useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  useDisclosure,
  Avatar,
  Modal,
  Button,
  Input
} from '@nextui-org/react'
import { EditIcon, EyeIcon } from 'lucide-react'
import { columns, users } from './data'
import ViewGroupMemberDetail from '../user-action/view-group-member-detail'

// Cấu trúc cột với 'Avatar' và 'Name'
const updatedColumns = [
  { name: 'Avatar', uid: 'avatar' },
  { name: 'Name', uid: 'name' },
  { name: 'Email', uid: 'email' },
  { name: 'Role', uid: 'role' },
  { name: 'Actions', uid: 'actions' }
]

type User = (typeof users)[0]

export default function ViewGroupTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onOpenChange: onDetailOpenChange } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure()

  const handleOpenDetail = (user: User) => {
    setSelectedUser(user)
    onDetailOpen()
  }

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user)
    onEditOpen()
  }

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User]

    switch (columnKey) {
      case 'avatar':
        return <Avatar src={user.avatar} alt={user.name} radius='lg' />
      case 'name':
        return <p>{user.name}</p>
      case 'email':
        return <p>{user.email}</p>
      case 'role':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize'>{cellValue}</p>
            <p className='text-bold text-sm capitalize text-default-400'>{user.team}</p>
          </div>
        )
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Chi tiết'>
              <span
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
                onClick={() => handleOpenDetail(user)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content='Chỉnh sửa'>
              <span
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
                onClick={() => handleOpenEdit(user)}
              >
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <>
      <Table aria-label='Bảng thành viên nhóm'>
        <TableHeader columns={updatedColumns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
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

      {/* Modal hiển thị chi tiết thành viên */}
      {selectedUser && (
        <ViewGroupMemberDetail isOpen={isDetailOpen} onOpenChange={onDetailOpenChange} user={selectedUser} />
      )}

      {/* Modal chỉnh sửa thành viên */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
        <div>
          <h3>Chỉnh sửa thông tin thành viên</h3>
        </div>
        <div>
          <Input label='Name' defaultValue={selectedUser?.name} fullWidth />
          <Input label='Email' defaultValue={selectedUser?.email} fullWidth />
          <Input label='Role' defaultValue={selectedUser?.role} fullWidth />
        </div>
        <div>
          <Button variant='flat' color='default' onPress={() => onEditOpenChange()}>
            Cancel
          </Button>
          <Button onPress={() => alert('Lưu thành công!')}>Save</Button>
        </div>
      </Modal>
    </>
  )
}
