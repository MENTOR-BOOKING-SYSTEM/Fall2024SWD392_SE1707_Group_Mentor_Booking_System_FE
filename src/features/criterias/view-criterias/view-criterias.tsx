import CreateCriteria from '../create-criteria/create-criteria-form.provider'
import ViewCriteriaDetail from '../view-criteria-detail/view-criteria-detail'
import ViewCriteriasTable from './view-criterias-table'
import { useViewCriterias } from './use-view-criterias'
import { getColor, getStatus } from './utils/criteria.util'
import { Criteria } from '@/models/criteria.model'
import { Chip } from '@nextui-org/chip'
import { format } from 'date-fns'
import { DATE_FORMAT } from '@/constants'

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
        <>
          {criteria.description ? (
            <p className='truncate text-ellipsis max-w-full'>{criteria.description}</p>
          ) : (
            <p className='text-default-400 w-full truncate'>No description available</p>
          )}
        </>
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
          <ViewCriteriaDetail criteriaID={criteria.criteriaID} />
          <ViewCriteriaDetail criteriaID={criteria.criteriaID} isEdit />
        </div>
      )
    }
  })
}

export default function ViewCriterias() {
  const { data, isLoading } = useViewCriterias()

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-3 justify-between'>
        {/* <FilterCriteria /> */}
        <CreateCriteria isDisabled={isLoading} />
      </div>
      <ViewCriteriasTable data={data} isLoading={isLoading} columns={columns} transformData={transformData} />
    </div>
  )
}
