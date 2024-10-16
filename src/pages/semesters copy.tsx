import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react'
import { format } from 'date-fns'
import { EyeIcon } from '@/components/icon/eye-icon'
import { EditIcon } from '@/components/icon/edit-icon'
interface ISemester {
  semesterID: number
  semesterName: string
  startDate: string
  endDate: string
  description: string | null
}

const semesters: ISemester[] = [
  {
    semesterID: 1,
    semesterName: 'SPRING2024',
    startDate: '2023-12-31T17:00:00.000Z',
    endDate: '2024-04-21T17:00:00.000Z',
    description: 'This is a very long description for testing purposes.'
  },
  {
    semesterID: 42,
    semesterName: 'SUMMER2024',
    startDate: '2024-04-22T17:00:00.000Z',
    endDate: '2024-08-12T17:00:00.000Z',
    description: 'Short desc'
  },
  {
    semesterID: 43,
    semesterName: 'FALL2024',
    startDate: '2024-08-13T17:00:00.000Z',
    endDate: '2024-12-03T17:00:00.000Z',
    description: null
  }
]

const getStatus = (startDate: string | number | Date, endDate: string | number | Date) => {
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (now < start) {
    return 'Upcoming'
  } else if (now > end) {
    return 'Finished'
  } else {
    return 'Current'
  }
}

const getColor = (status: string) => {
  switch (status) {
    case 'Current':
      return 'success'
    case 'Finished':
      return 'warning'
    case 'Upcoming':
      return 'primary'
    default:
      return 'default'
  }
}

const formatDate = (dateString: string | number | Date) => {
  return format(new Date(dateString), 'dd/MM/yyyy')
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

export default function App() {
  return (
    <Table aria-label='Semester Table'>
      <TableHeader>
        <TableColumn className='text-left'>ID</TableColumn>
        <TableColumn className='text-center'>Semester</TableColumn>
        <TableColumn className='text-center'>Start Date</TableColumn>
        <TableColumn className='text-center'>End Date</TableColumn>
        <TableColumn className='text-center'>Description</TableColumn>
        <TableColumn className='text-center'>Status</TableColumn>
        <TableColumn className='text-center'>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {semesters.map((semester) => {
          const status = getStatus(semester.startDate, semester.endDate)
          const color = getColor(status)

          return (
            <TableRow key={semester.semesterID}>
              <TableCell className='text-left hover:bg-gray-100 hover:rounded-lg'>{semester.semesterID}</TableCell>
              <TableCell className='text-center hover:bg-gray-100 hover:rounded-lg'>{semester.semesterName}</TableCell>
              <TableCell className='text-center hover:bg-gray-100 hover:rounded-lg'>
                {formatDate(semester.startDate)}
              </TableCell>
              <TableCell className='text-center hover:bg-gray-100 hover:rounded-lg'>
                {formatDate(semester.endDate)}
              </TableCell>
              <TableCell className='text-center hover:bg-gray-100 hover:rounded-lg'>
                {semester.description ? truncateText(semester.description, 10) : '_'}
              </TableCell>
              <TableCell className='text-center hover:bg-gray-100 hover:rounded-lg'>
                <Chip color={color} variant='flat' className='capitalize'>
                  {status}
                </Chip>
              </TableCell>
              <TableCell className='text-center'>
                <button className='mx-2'>
                  <EyeIcon />
                </button>
                <button className='mx-2'>
                  <EditIcon />
                </button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
