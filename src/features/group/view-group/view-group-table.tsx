import React, { useState, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Spinner,
  getKeyValue
} from '@nextui-org/react'
import { EyeIcon } from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { useViewGroupMembers } from './use-view-group-members'
import { PackageOpen } from 'lucide-react'
import ViewGroupMemberDetail from '../view-group-member-detail/view-group-member-detail'
import EditGroupMemberModal from '../edit-group-member/edit-group-member-modal'

const columns = [
  { name: 'NAME', uid: 'name', className: 'text-left' },
  { name: 'EMAIL', uid: 'email', className: 'text-left' },
  { name: 'POSITION', uid: 'position', className: 'text-center' },
  { name: 'ACTIONS', uid: 'actions', className: 'text-center' }
]

const transformData = (members: any[]) => {
  return members.map((member) => ({
    ...member,
    name: `${member.firstName} ${member.lastName}`,
    position: member.position || 'N/A'
  }))
}

export default function ViewGroupTable() {
  const { currentUserInfo } = useUser()
  const { data: members, isLoading, refetch } = useViewGroupMembers(currentUserInfo.groupID || 0)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transformedData, setTransformedData] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    if (members && Array.isArray(members.result)) {
      const transformed = transformData(members.result)
      setTransformedData(transformed)
      const current = transformed.find((user) => user.userID === currentUserInfo.userID)
      setCurrentUser(current)
      console.log('Current User:', current)
      console.log('Is Current User Leader:', current?.position === 'Leader')
    }
  }, [members, currentUserInfo.userID])

  const handleViewDetail = (user: any) => {
    setSelectedUser({
      userId: user.userID,
      name: `${user.firstName} ${user.lastName}`,
      role: user.position,
      team: user.groupName,
      email: user.email,
      avatarUrl: user.avatarUrl
    })
    setIsModalOpen(true)
  }

  const renderCell = React.useCallback(
    (user: any, columnKey: React.Key) => {
      switch (columnKey) {
        case 'name':
          return (
            <User
              avatarProps={{
                radius: 'lg',
                src: user.avatarUrl || 'https://i.pravatar.cc/150?img=default'
              }}
              name={user.name}
            />
          )
        case 'email':
          return user.email
        case 'position':
          return user.position
        case 'actions':
          return (
            <div className='relative flex items-center gap-2 justify-center'>
              <Tooltip content='View Detail'>
                <span
                  className='text-lg text-default-400 cursor-pointer active:opacity-50'
                  onClick={() => handleViewDetail(user)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              {currentUser?.position === 'Leader' && user.position !== 'Leader' && (
                <EditGroupMemberModal
                  member={{
                    userID: user.userID,
                    name: `${user.firstName} ${user.lastName}`,
                    position: user.position,
                    email: user.email,
                    avatarUrl: user.avatarUrl
                  }}
                  groupID={currentUserInfo.groupID || 0}
                  onSuccess={() => refetch()}
                  isCurrentUserLeader={currentUser?.position === 'Leader'}
                />
              )}
            </div>
          )
        default:
          return null
      }
    },
    [currentUser, handleViewDetail, currentUserInfo.groupID, refetch]
  )

  if (!currentUserInfo.groupID) {
    return (
      <div className='flex flex-col items-center gap-2 py-8'>
        <PackageOpen className='w-10 h-10 stroke-1 text-default-300' />
        <p>You don't have any group</p>
      </div>
    )
  }

  return (
    <>
      <Table
        aria-label='Group Member Table'
        classNames={{
          table: 'min-h-[200px]'
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} className={column.className}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={transformedData}
          isLoading={isLoading}
          loadingContent={<Spinner />}
          emptyContent={
            <div className='flex flex-col items-center gap-2'>
              <PackageOpen className='w-10 h-10 stroke-1 text-default-300' />
              <p>You don't have any group</p>
            </div>
          }
        >
          {(item) => (
            <TableRow key={item.email}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>

      {selectedUser && (
        <ViewGroupMemberDetail isOpen={isModalOpen} onOpenChange={() => setIsModalOpen(false)} user={selectedUser} />
      )}
    </>
  )
}
