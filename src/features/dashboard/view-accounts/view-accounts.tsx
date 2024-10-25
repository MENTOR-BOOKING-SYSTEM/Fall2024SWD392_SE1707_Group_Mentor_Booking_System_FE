import EmptyContainer from '@/components/shared/empty-container'
import { Account } from '@/models/user.model'
import { useViewAccounts } from './use-view-accounts'
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { Avatar, Chip, Pagination, Spinner } from '@nextui-org/react'
import { getColor } from './utils/account.util'
import { format } from 'date-fns'
import { DATE_FORMAT } from '@/constants'
import { EditIcon, EyeIcon } from 'lucide-react'
import { useState } from 'react'

const columns = [
  {
    key: 'userID',
    label: 'ID',
    className: 'w-16'
  },
  {
    key: 'avatarUrl',
    label: 'Avatar',
    className: 'text-center w-24'
  },
  {
    key: 'email',
    label: 'Email',
    className: ''
  },
  {
    key: 'username',
    label: 'Username',
    className: 'w-36'
  },
  {
    key: 'name',
    label: 'Name',
    className: ''
  },
  {
    key: 'roles',
    label: 'Roles',
    className: ''
  },
  {
    key: 'createdAt',
    label: 'Created At',
    className: 'text-center w-32'
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    className: 'text-center w-32'
  },
  {
    key: 'actions',
    label: 'Actions',
    className: 'text-center w-32'
  }
]

const transformData = (accounts: Account[]) => {
  return accounts
    .sort((a, b) => a.userID - b.userID)
    .map((account) => ({
      userID: account.userID,
      avatarUrl: (
        <div className='flex justify-center'>
          <Avatar src={account.avatarUrl || ''} isBordered color='primary' />
        </div>
      ),
      email: account.email,
      username: account.username,
      name: `${account.firstName} ${account.lastName}`,
      roles: (
        <div className='flex flex-wrap items-center gap-2'>
          {account.roles.map((role) => (
            <Chip size='sm' variant='flat' color={getColor(role.roleName)}>
              {role.roleName}
            </Chip>
          ))}
        </div>
      ),
      createdAt: <p className='text-center'>{format(account.createdAt, DATE_FORMAT.DEFAULT)}</p>,
      updatedAt: <p className='text-center'>{format(account.updatedAt, DATE_FORMAT.DEFAULT)}</p>,
      actions: (
        <div className='flex justify-center items-center gap-3'>
          <EyeIcon className='w-5 h-5 stroke-1 cursor-pointer' />
          <EditIcon className='w-5 h-5 stroke-1 cursor-pointer' />
        </div>
      )
    }))
}

export default function ViewAccounts() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useViewAccounts(page, 10)
  const transformedData = transformData(data?.accounts || [])

  return (
    <Table
      classNames={{
        table: 'min-h-60'
      }}
      color='default'
      selectionMode='single'
      disallowEmptySelection
      aria-label='Accounts Table'
      bottomContent={
        data?.pages || 0 > 0 ? (
          <div className='flex w-full justify-center'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='primary'
              page={page}
              total={data?.pages || 0}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn className={column.className} key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={transformedData}
        isLoading={isLoading}
        loadingContent={<Spinner />}
        emptyContent={<EmptyContainer />}
      >
        {(account) => (
          <TableRow key={account.userID}>
            {(columnKey) => (
              <TableCell className='max-w-32' key={columnKey}>
                {getKeyValue(account, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
