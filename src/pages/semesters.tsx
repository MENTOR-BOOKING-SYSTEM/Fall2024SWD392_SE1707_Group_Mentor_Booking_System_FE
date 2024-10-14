import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  useDisclosure,
  ModalFooter,
  ModalBody,
  Button,
  ModalContent,
  Modal,
  ModalHeader
} from '@nextui-org/react'

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

// Sử dụng hook useDisclosure cho NextUI
const { isOpen, onOpen, onClose } = useDisclosure()

// Chỉ định kích thước cố định là '3xl'
const handleOpen = () => {
  onOpen()
}

export default function Semesters() {
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
                        <span className='text-blue-500 cursor-pointer hover:underline'>View</span>
                        <span className='text-green-500 cursor-pointer hover:underline'>Edit</span>
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

      <div className='flex flex-wrap gap-3'>
        <Button onPress={handleOpen}>Open 3xl</Button>
      </div>

      <Modal size='3xl' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit
                  venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit
                  venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit
                  dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris
                  do dolor eiusmod.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
