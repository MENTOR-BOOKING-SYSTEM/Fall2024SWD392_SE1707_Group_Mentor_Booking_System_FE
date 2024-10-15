import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react'
import { format } from 'date-fns'
import { EyeIcon } from 'lucide-react'

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
    description: null
  },
  {
    semesterID: 42,
    semesterName: 'SUMMER2024',
    startDate: '2024-04-22T17:00:00.000Z',
    endDate: '2024-08-12T17:00:00.000Z',
    description: null
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

export default function App() {
  return (
    <Table aria-label='Semester Table'>
      <TableHeader>
        <TableColumn className='text-center'>ID</TableColumn>
        <TableColumn className='text-center'>Semester</TableColumn>
        <TableColumn className='text-center'>Start Date</TableColumn>
        <TableColumn className='text-center'>End Date</TableColumn>
        <TableColumn className='text-center'>Description</TableColumn>
        <TableColumn className='text-center'>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {semesters.map((semester) => {
          const status = getStatus(semester.startDate, semester.endDate)
          const color = getColor(status)

          return (
            <TableRow key={semester.semesterID} className='hover:bg-gray-100 '>
              <TableCell className='text-center'>{semester.semesterID}</TableCell>
              <TableCell className='text-center'>{semester.semesterName}</TableCell>
              <TableCell className='text-center'>{formatDate(semester.startDate)}</TableCell>
              <TableCell className='text-center'>{formatDate(semester.endDate)}</TableCell>
              <TableCell className='text-center'>{semester.description ? semester.description : '_'}</TableCell>
              <TableCell className='text-center'>
                <Chip color={color} variant='flat' className='capitalize'>
                  {status}
                </Chip>
              </TableCell>
              {/* <TableCell>
                <span>
                  <EyeIcon />
                </span>
              </TableCell> */}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
