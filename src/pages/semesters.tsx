import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react'

const formatDate = (dateString: string) => {
  const [month, day, year] = dateString.split('/')
  return `${day}/${month}/${year}`
}

const rows = [
  {
    id: 1,
    key: '1',
    semester: 'Semester 1',
    startDate: '10/01/2024',
    endDate: '10/10/2024',
    status: 'Finished'
  },
  {
    id: 2,
    key: '2',
    semester: 'Semester 2',
    startDate: '10/11/2024',
    endDate: '10/20/2024',
    status: 'Current'
  },
  {
    id: 3,
    key: '3',
    semester: 'Semester 3',
    startDate: '10/21/2025',
    endDate: '10/25/2025',
    status: 'Upcoming'
  },
  {
    id: 4,
    key: '4',
    semester: 'Semester 4',
    startDate: '01/01/2026',
    endDate: '01/12/2026',
    status: 'Upcoming'
  }
]

const validateDates = (startDate: string | number | Date, endDate: string | number | Date) => {
  return new Date(endDate) > new Date(startDate)
}

const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'semester',
    label: 'SEMESTER'
  },
  {
    key: 'startDate',
    label: 'START DATE'
  },
  {
    key: 'endDate',
    label: 'END DATE'
  },
  {
    key: 'status',
    label: 'STATUS'
  },
  {
    key: 'action',
    label: 'ACTIONS'
  }
]

export default function Semesters() {
  return (
    <Table aria-label='all semesters'>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>
                {columnKey === 'action' ? (
                  <>
                    <span style={{ marginRight: '10px', cursor: 'pointer' }}>View</span>
                    <span style={{ cursor: 'pointer' }}>Edit</span>
                  </>
                ) : columnKey === 'startDate' ? (
                  formatDate(item.startDate)
                ) : columnKey === 'endDate' ? (
                  !validateDates(item.startDate, item.endDate) ? (
                    'Invalid Date'
                  ) : (
                    formatDate(item.endDate)
                  )
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
