import React, { useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ModalFooter,
  ModalBody,
  Button,
  ModalContent,
  Modal,
  ModalHeader,
  Input,
  getKeyValue
} from '@nextui-org/react'

const formatDate = (dateString: string) => {
  const [month, day, year] = dateString.split('/')
  return `${day}/${month}/${year}`
}
interface Semester {
  id: number
  key: string
  semester: string
  startDate: string
  endDate: string
  status: string
}

const rows: Semester[] = [
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
    endDate: '10/25/2023',
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
  // Định nghĩa selectedItem là Semester hoặc null
  const [selectedItem, setSelectedItem] = useState<Semester | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleOpen = (item: Semester, editMode: boolean) => {
    setSelectedItem(item)
    setIsEditMode(editMode)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedItem(null)
    setIsEditMode(false)
  }

  const handleSave = () => {
    //lưu lại thông tin đã chỉnh sửa
    console.log('Saved', selectedItem)
    setIsOpen(false)
  }

  const handleInputChange = (key: keyof Semester, value: string) => {
    if (selectedItem) {
      setSelectedItem({
        ...selectedItem,
        [key]: value
      })
    }
  }

  return (
    <div>
      <div className='Table'>
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
                          className='text-blue-500 cursor-pointer hover:underline'
                          onClick={() => handleOpen(item, false)}
                        >
                          View
                        </span>
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
                      !validateDates(item.startDate, item.endDate) ? (
                        <span className='text-red-500'>Invalid Date</span>
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
      </div>

      {/* Modal hiển thị thông tin chi tiết */}
      <Modal size='3xl' isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>{isEditMode ? 'Edit Semester' : 'Semester Details'}</ModalHeader>
          <ModalBody>
            {selectedItem && (
              <>
                <p>
                  <strong>Semester:</strong>{' '}
                  {isEditMode ? (
                    <Input
                      value={selectedItem.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                    />
                  ) : (
                    selectedItem.semester
                  )}
                </p>
                <p>
                  <strong>Start Date:</strong>{' '}
                  {isEditMode ? (
                    <Input
                      value={selectedItem.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  ) : (
                    formatDate(selectedItem.startDate)
                  )}
                </p>
                <p>
                  <strong>End Date:</strong>{' '}
                  {isEditMode ? (
                    <Input
                      value={selectedItem.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                    />
                  ) : (
                    formatDate(selectedItem.endDate)
                  )}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  {isEditMode ? (
                    <Input value={selectedItem.status} onChange={(e) => handleInputChange('status', e.target.value)} />
                  ) : (
                    selectedItem.status
                  )}
                </p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={handleClose}>
              Close
            </Button>
            {isEditMode && (
              <Button color='primary' onPress={handleSave}>
                Save
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
