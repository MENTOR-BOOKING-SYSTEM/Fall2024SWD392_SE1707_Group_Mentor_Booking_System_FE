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
  const [year, month, day] = dateString.split('/')
  return `${day}/${month}/${year}`
}

interface Semester {
  id: number
  key: string
  semester: string
  startDate: string
  endDate: string
  status?: string // status calculated dynamically
}

const rows: Semester[] = [
  {
    id: 1,
    key: '1',
    semester: 'Semester 1',
    startDate: '2024/01/01',
    endDate: '2024/04/15'
  },
  {
    id: 2,
    key: '2',
    semester: 'Semester 2',
    startDate: '2024/05/01',
    endDate: '2024/08/31'
  },
  {
    id: 3,
    key: '3',
    semester: 'Semester 3',
    startDate: '2025/01/01',
    endDate: '2025/04/15'
  },
  {
    id: 4,
    key: '4',
    semester: 'Semester 4',
    startDate: '2026/01/01',
    endDate: '2026/04/15'
  }
]

const calculateStatus = (startDate: string, endDate: string) => {
  const today = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (today < start) {
    return 'Upcoming'
  } else if (today > end) {
    return 'Finished'
  } else {
    return 'Current'
  }
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
                  <strong>Status:</strong> {calculateStatus(selectedItem.startDate, selectedItem.endDate)}
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
