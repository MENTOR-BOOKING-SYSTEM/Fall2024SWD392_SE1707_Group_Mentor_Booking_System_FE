import ViewAccountsTable from './view-accounts-table'
import CreateAccount from '../create-account/create-account-form.provider'
import { DATE_FORMAT } from '@/constants'
import { Account } from '@/models/user.model'
import { Avatar, Chip, Select, SelectItem, Skeleton } from '@nextui-org/react'
import { format } from 'date-fns'
import { EditIcon, EyeIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useViewAccounts } from './use-view-accounts'
import { getColor } from './utils/account.util'
import { useViewSemesters } from '@/features/semesters/view-semesters/use-view-semesters'

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
            <Chip key={role.roleID} size='sm' variant='flat' color={getColor(role.roleName)}>
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
  const { data: semesters, isLoading: isLoadingSemesters } = useViewSemesters()
  const [selectedSemesterID, setSelectedSemesterID] = useState<number | undefined>(undefined)
  const { data, isLoading } = useViewAccounts(page, 10, selectedSemesterID || 0)

  useEffect(() => {
    if (semesters) {
      const currentSemester = semesters.find((semester) => {
        const currentDate = new Date()
        const startDate = new Date(semester.startDate)
        const endDate = new Date(semester.endDate)

        return startDate <= currentDate && endDate >= currentDate
      })
      setSelectedSemesterID(currentSemester?.semesterID)
    }
  }, [semesters])

  return (
    <div className='flex flex-col gap-3'>
      {isLoadingSemesters ? (
        <Skeleton className='w-full rounded-lg'>
          <div className='h-12 w-full rounded-lg bg-default-300'></div>
        </Skeleton>
      ) : (
        <Select
          items={semesters}
          label='Semester'
          placeholder='Select a semester'
          selectedKeys={selectedSemesterID ? [String(selectedSemesterID)] : []}
          onChange={(e) => setSelectedSemesterID(parseInt(e.target.value))}
          disallowEmptySelection
        >
          {(semester) => (
            <SelectItem key={semester.semesterID}>
              {semester.semesterName +
                ' (' +
                format(semester.startDate, DATE_FORMAT.DEFAULT) +
                ' to ' +
                format(semester.endDate, DATE_FORMAT.DEFAULT) +
                ')'}
            </SelectItem>
          )}
        </Select>
      )}
      <div className='ml-auto'>
        <CreateAccount isDisabled={isLoading} />
      </div>
      <ViewAccountsTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        transformData={transformData}
      />
    </div>
  )
}
