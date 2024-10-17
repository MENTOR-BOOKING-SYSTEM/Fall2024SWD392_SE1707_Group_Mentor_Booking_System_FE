import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react'
import { ISemester } from './type-semester'
import { EyeIcon } from '@/components/icon/eye-icon'
import { EditIcon } from '@/components/icon/edit-icon'
import { formatDate, truncateText, getStatus, getColor } from './utils-semester'
import React from 'react'

interface SemesterTableProps {
  semesters?: ISemester[]
}

const SemesterTable: React.FC<SemesterTableProps> = ({ semesters = [] }) => {
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

export default SemesterTable
