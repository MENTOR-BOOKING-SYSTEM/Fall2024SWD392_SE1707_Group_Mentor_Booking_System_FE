import EmptyContainer from '@/components/shared/empty-container'
import { ROLES } from '@/constants'
import { getColor } from '@/features/dashboard/view-accounts/utils/account.util'
import { User } from '@/models/user.model'
import { Chip } from '@nextui-org/chip'
import { Avatar, Spinner } from '@nextui-org/react'
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { useGetAllReviewers } from './use-get-all-reviewers'

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
    key: 'actions',
    label: 'Actions',
    className: 'text-center w-32'
  }
]

export default function GetAllReviewers() {
  // const [page, setPage] = useState(1)
  // const { data: semesters, isLoading: isLoadingSemesters } = useViewSemesters()
  // const [selectedSemesterID, setSelectedSemesterID] = useState<number | undefined>(undefined)
  const { data, isLoading } = useGetAllReviewers()

  // useEffect(() => {
  //   if (semesters) {
  //     const currentSemester = semesters.find((semester) => {
  //       const currentDate = new Date()
  //       const startDate = new Date(semester.startDate)
  //       const endDate = new Date(semester.endDate)

  //       return startDate <= currentDate && endDate >= currentDate
  //     })
  //     setSelectedSemesterID(currentSemester?.semesterID)
  //   }
  // }, [semesters])

  const transformData = (accounts: User[]) => {
    return accounts
      .filter((acc) => acc.roles.includes(ROLES.REVIEWER))
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
              <Chip key={role} size='sm' variant='flat' color={getColor(role)}>
                {role}
              </Chip>
            ))}
          </div>
        )
      }))
  }

  const transformedData = transformData(data || [])

  return (
    <div>
      <Table
        classNames={{
          table: 'min-h-60'
        }}
        color='primary'
        selectionMode='single'
        disallowEmptySelection
        aria-label='Reviewers Table'
        // bottomContent={
        //   data?.pages || 0 > 0 ? (
        //     <div className='flex w-full justify-center'>
        //       <Pagination
        //         isCompact
        //         showControls
        //         showShadow
        //         color='primary'
        //         page={page}
        //         total={data?.pages || 0}
        //         onChange={(page) => setPage(page)}
        //       />
        //     </div>
        //   ) : null
        // }
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
    </div>
  )
}
