import Modal from '@/components/ui/modal'
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
import { Semester } from '@/models/semester.model'
import { getColor, getStatus } from './utils/semester.util'
import { EditIcon, EyeIcon } from 'lucide-react'
import { format } from 'date-fns'

const dateFormat = 'dd/MM/yyyy'

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
    className: 'text-center w-16'
  },
  {
    key: 'endDate',
    label: 'End Date',
    className: 'text-center w-16'
  },
  {
    key: 'description',
    label: 'Description',
    className: 'text-left w-[520px]'
  },
  {
    key: 'status',
    label: 'Status',
    className: 'text-center w-32'
  },
  {
    key: 'actions',
    label: 'Actions',
    className: 'text-left w-20'
  }
]

const transformData = (semesters: Semester[]) => {
  return semesters.map((semester) => {
    const status = getStatus(semester.startDate, semester.endDate)

    return {
      id: semester.semesterID,
      semesterName: semester.semesterName,
      startDate: <p className='text-center'>{format(semester.startDate, dateFormat)}</p>,
      endDate: <p className='text-center'>{format(semester.endDate, dateFormat)}</p>,
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
          <div className='flex items-center gap-2'>
            <Modal body={<>Hello</>} onSubmit={() => {}}>
              <EyeIcon className='w-5 h-5 stroke-1 cursor-pointer' />
            </Modal>
            <Modal body={<>Hello</>} onSubmit={() => {}}>
              <EditIcon className='w-5 h-5 stroke-1 cursor-pointer' />
            </Modal>
          </div>
        ) : (
          <Modal body={<>Hello</>} onSubmit={() => {}}>
            <EyeIcon className='w-5 h-5 stroke-1 cursor-pointer' />
          </Modal>
        )
    }
  })
}

export default function ViewSemesters() {
  const { data, isLoading } = useViewSemesters()
  const transformedData = transformData(data || [])

  return (
    <Table
      classNames={{
        table: 'min-h-60'
      }}
      color='default'
      selectionMode='single'
      defaultSelectedKeys={['50']}
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
  )
}
