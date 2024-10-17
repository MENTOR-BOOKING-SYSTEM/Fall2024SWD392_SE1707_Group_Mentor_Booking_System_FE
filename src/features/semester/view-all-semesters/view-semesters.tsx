import Modal from '@/components/ui/modal'
import FilterSemester from '../filter-semester/filter-semester'
import CreateSemester from '../create-semester/create-semester-form.provider'
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
import { useViewSemesters } from './use-view-semesters'
import { getColor, getStatus } from './utils/semester.util'
import { EyeIcon } from 'lucide-react'
import { format } from 'date-fns'
import EditSemester from '../edit-semester/edit-semester'
import { DATE_FORMAT } from '@/constants'
import ViewDetailSemester from '../view-detail-semester/view-detai-semester'

const columns = [
  {
    key: 'id',
    label: 'ID',
    className: 'text-left w-16'
  },
  {
    key: 'semesterName',
    label: 'Semester',
    className: 'text-left w-96'
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
    className: 'text-left w-[520px]'
  },
  {
    key: 'status',
    label: 'Status',
    className: 'text-center'
  },
  {
    key: 'actions',
    label: 'Actions',
    className: 'text-center'
  }
]

const transformData = (semesters: Semester[]) => {
  return semesters.map((semester) => {
    const status = getStatus(semester.startDate, semester.endDate)

    return {
      id: semester.semesterID,
      semesterName: semester.semesterName,
      startDate: <p className='text-center'>{format(semester.startDate, DATE_FORMAT.DEFAULT)}</p>,
      endDate: <p className='text-center'>{format(semester.endDate, DATE_FORMAT.DEFAULT)}</p>,
      description: (
        <div className='truncate max-w-96'>
          {semester.description ? (
            <p>{semester.description}</p>
          ) : (
            <p className='text-default-400 w-full truncate'>No description available</p>
          )}
        </div>
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
            <ViewDetailSemester semester={semester} />
            {/* Edit Pop-up */}
            <EditSemester semester={semester} />
          </div>
        ) : (
          <div className='flex items-center justify-center gap-2'>
            <ViewDetailSemester semester={semester} />
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
        <FilterSemester />
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
            <TableRow key={semester.id} className='max-w-32'>
              {(columnKey) => <TableCell key={columnKey}>{getKeyValue(semester, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
