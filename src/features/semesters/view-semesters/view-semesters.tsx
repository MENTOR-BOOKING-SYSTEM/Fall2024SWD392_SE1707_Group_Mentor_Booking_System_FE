import CreateSemester from '../create-semester/create-semester-form.provider'
import FilterSemester from '../filter-semester/filter-semester'
import ViewSemesterDetail from '../view-semester-detail/view-semester-detail'
import { DATE_FORMAT } from '@/constants'
import { Semester } from '@/models/semester.model'
import {
  Chip,
  getKeyValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { format } from 'date-fns'
import { useViewSemesters } from './use-view-semesters'
import { getColor, getStatus } from './utils/semester.util'

const columns = [
  {
    key: 'id',
    label: 'ID',
    className: 'text-left w-16'
  },
  {
    key: 'semesterName',
    label: 'Semester',
    className: 'text-left w-64'
  },
  {
    key: 'startDate',
    label: 'Start Date',
    className: 'text-center w-28'
  },
  {
    key: 'endDate',
    label: 'End Date',
    className: 'text-center w-28'
  },
  {
    key: 'description',
    label: 'Description',
    className: 'text-left'
  },
  {
    key: 'status',
    label: 'Status',
    className: 'text-center w-24'
  },
  {
    key: 'actions',
    label: 'Actions',
    className: 'text-center w-24'
  }
]

const transformData = (semesters: Semester[]) => {
  return semesters.map((semester) => {
    const status = getStatus(semester.startDate, semester.endDate)

    return {
      id: semester.semesterID,
      semesterName: <p className='font-semibold'>{semester.semesterName}</p>,
      startDate: <p className='text-center'>{format(semester.startDate, DATE_FORMAT.DEFAULT)}</p>,
      endDate: <p className='text-center'>{format(semester.endDate, DATE_FORMAT.DEFAULT)}</p>,
      description: (
        <>
          {semester.description ? (
            <p className='truncate text-ellipsis max-w-full'>{semester.description}</p>
          ) : (
            <p className='text-default-400 w-full truncate'>No description available</p>
          )}
        </>
      ),
      status: (
        <div className='flex justify-center'>
          <Chip color={getColor(status)} variant='flat' size='sm'>
            {status.toUpperCase()}
          </Chip>
        </div>
      ),
      actions:
        status === 'Upcoming' ? (
          <div className='flex items-center justify-center gap-2'>
            <ViewSemesterDetail semesterID={semester.semesterID} />
            <ViewSemesterDetail semesterID={semester.semesterID} isEdit />
          </div>
        ) : (
          <div className='flex items-center justify-center gap-2'>
            <ViewSemesterDetail semesterID={semester.semesterID} />
          </div>
        )
    }
  })
}

export default function ViewSemesters() {
  const { data, isLoading } = useViewSemesters()
  const transformedData = transformData(data || [])

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex items-center gap-3 justify-between'>
        {/* <FilterSemester /> */}
        <CreateSemester latestSemester={data ? data[data?.length - 1] : null} isDisabled={isLoading} />
      </div>
      <Table
        classNames={{
          table: 'min-h-60'
        }}
        color='default'
        selectionMode='single'
        disallowEmptySelection
        aria-label='Semester Table'
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn className={column.className} key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={transformedData} isLoading={isLoading} loadingContent={<Spinner />}>
          {(semester) => (
            <TableRow key={semester.id}>
              {(columnKey) => (
                <TableCell className='max-w-32' key={columnKey}>
                  {getKeyValue(semester, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
