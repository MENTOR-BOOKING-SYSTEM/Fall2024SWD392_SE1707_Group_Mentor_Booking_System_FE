import CreateCriteria from '../create-criteria/create-criteria-form.provider'
import FilterCriteria from '../filter-criteria/filter-criteria'
import Modal from '@/components/ui/modal'
import { DATE_FORMAT } from '@/constants'
import { Criteria } from '@/models/criteria.model'
import { Chip, Spinner } from '@nextui-org/react'
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { format } from 'date-fns'
import { EditIcon, EyeIcon } from 'lucide-react'
import { getColor, getStatus } from './utils/criteria.util'
interface ViewCriteriasTableProps {
  data: Criteria[] | undefined
  isLoading: boolean
}

const columns = [
  {
    key: 'criteriaID',
    label: 'ID',
    className: 'text-left w-16'
  },
  {
    key: 'criteriaName',
    label: 'Criteria',
    className: 'text-left w-72'
  },
  {
    key: 'description',
    label: 'Description',
    className: 'text-left'
  },
  {
    key: 'type',
    label: 'Type',
    className: 'text-center w-24'
  },
  {
    key: 'createdAt',
    label: 'Created At',
    className: 'text-center w-32'
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    className: 'text-center w-32'
  },
  {
    key: 'actions',
    label: 'Actions',
    className: 'text-center w-24'
  }
]

//lấy những field bảng khi cần như là list ra
const transformData = (criterias: Criteria[]) => {
  return criterias.map((criteria) => {
    const type = getStatus(String(criteria.type))

    return {
      criteriaID: criteria.criteriaID,
      criteriaName: <p className='font-semibold'>{criteria.criteriaName}</p>,
      description: (
        <div className=''>
          {criteria.description ? (
            <p className='truncate text-ellipsis max-w-full'>{criteria.description}</p>
          ) : (
            <p className='text-default-400 w-full truncate'>No description available</p>
          )}
        </div>
      ),
      type: (
        <div className='flex justify-center'>
          <Chip color={getColor(type)} variant='flat' size='sm'>
            {type.toUpperCase()}
          </Chip>
        </div>
      ),
      createdAt: <p className='text-center'>{format(criteria.createdAt, DATE_FORMAT.DEFAULT)}</p>,
      updatedAt: <p className='text-center'>{format(criteria.updatedAt, DATE_FORMAT.DEFAULT)}</p>,
      actions: (
        <div className='flex items-center justify-center gap-2'>
          <Modal body={<>Hello</>} onSubmit={() => {}}>
            <EyeIcon className='w-5 h-5 stroke-1 cursor-pointer' />
          </Modal>
          <Modal body={<>Hello</>} onSubmit={() => {}}>
            <EditIcon className='w-5 h-5 stroke-1 cursor-pointer' />
          </Modal>
        </div>
      )
    }
  })
}

export default function ViewCriteriasTable({ data, isLoading }: ViewCriteriasTableProps) {
  const transformedData = transformData(data || [])

  return (
    <div className='flex flex-col gap-4'>
      <Table
        classNames={{
          table: 'min-h-60'
        }}
        color='default'
        selectionMode='single'
        disallowEmptySelection
        aria-label='Criteria Table'
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn className={column.className} key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={transformedData} isLoading={isLoading} loadingContent={<Spinner />}>
          {(criteria) => (
            <TableRow key={criteria.criteriaID}>
              {(columnKey) => (
                <TableCell className='max-w-32' key={columnKey}>
                  {getKeyValue(criteria, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}