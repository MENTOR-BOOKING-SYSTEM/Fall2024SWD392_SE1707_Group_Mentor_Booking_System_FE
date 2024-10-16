import { TableRow, TableCell } from '@nextui-org/react'
import { ISemester } from './type'
import { EyeIcon } from '@/components/icon/eye-icon'
import { EditIcon } from '@/components/icon/edit-icon'
import StatusChip from './status-semester'
import { formatDate, getColor, getStatus, truncateText } from './utils'

interface SemesterRowProps {
  semester: ISemester
}

const SemesterRow: React.FC<SemesterRowProps> = ({ semester }) => {
  const status = getStatus(semester.startDate, semester.endDate)
  const color = getColor(status)

  return (
    <TableRow>
      <TableCell className='text-left hover:bg-gray-100 hover:rounded-lg'>{semester.semesterID}</TableCell>
      <TableCell className='text-center hover:bg-gray-100 hover:rounded-lg'>{semester.semesterName}</TableCell>
      <TableCell className='text-center hover:bg-gray-100 hover:rounded-lg'>{formatDate(semester.startDate)}</TableCell>
      <TableCell className='text-center hover:bg-gray-100 hover:rounded-lg'>{formatDate(semester.endDate)}</TableCell>
      <TableCell className='text-center hover:bg-gray-100 hover:rounded-lg'>
        {semester.description ? truncateText(semester.description, 10) : '_'}
      </TableCell>
      <TableCell className='text-center hover:bg-gray-100 hover:rounded-lg'>
        <StatusChip status={status} color={color} />
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
}

export default SemesterRow
