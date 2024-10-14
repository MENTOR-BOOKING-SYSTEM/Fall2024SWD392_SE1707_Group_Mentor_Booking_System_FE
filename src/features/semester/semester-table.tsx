import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react'

interface Semester {
  id: number
  key: string
  semester: string
  startDate: string
  endDate: string
  desc: string
  status?: string
}

interface SemesterTableProps {
  rows: Semester[]
  columns: { key: string; label: string }[]
  handleOpen: (item: Semester, editMode: boolean) => void
  formatDate: (dateString: string) => string
  calculateStatus: (startDate: string, endDate: string) => string
}

const SemesterTable: React.FC<SemesterTableProps> = ({ rows, columns, handleOpen, formatDate, calculateStatus }) => {
  return (
    <Table aria-label='all semesters'>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} className='text-center text-sm font-semibold text-gray-600'>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key} className='hover:bg-gray-50 transition duration-200 text-center'>
            {(columnKey) => (
              <TableCell className='px-4 py-2 border-b text-center'>
                {columnKey === 'action' ? (
                  <div className='flex justify-center space-x-2'>
                    <span
                      className='text-green-500 cursor-pointer hover:underline'
                      onClick={() => handleOpen(item, true)}
                    >
                      Edit
                    </span>
                  </div>
                ) : columnKey === 'startDate' ? (
                  formatDate(item.startDate)
                ) : columnKey === 'endDate' ? (
                  formatDate(item.endDate)
                ) : columnKey === 'status' ? (
                  calculateStatus(item.startDate, item.endDate)
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default SemesterTable
