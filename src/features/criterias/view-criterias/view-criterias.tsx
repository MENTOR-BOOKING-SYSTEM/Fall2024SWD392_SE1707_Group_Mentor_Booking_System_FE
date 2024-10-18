import ViewCriteriasTable from './view-criterias-table'
import { useViewCriterias } from './use-view-criterias'
import { Criteria } from '@/models/criteria.model'
import { getColor, getStatus } from './utils/criteria.util'
import { format } from 'date-fns'
import { DATE_FORMAT } from '@/constants'
import { EditIcon, EyeIcon } from 'lucide-react'

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

export default function ViewCriterias() {
  const { data, isLoading } = useViewCriterias()

  return <ViewCriteriasTable data={data} isLoading={isLoading} />
}
