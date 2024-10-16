import { Table, TableHeader, TableColumn, TableBody } from '@nextui-org/react'
import { ISemester } from './type'
import SemesterRow from './semester-row'

interface SemesterTableProps {
  semesters: ISemester[]
}

const SemesterTable: React.FC<SemesterTableProps> = ({ semesters }) => {
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
        {semesters.map((semester) => (
          <SemesterRow key={semester.semesterID} semester={semester} />
        ))}
      </TableBody>
    </Table>
  )
}

export default SemesterTable
