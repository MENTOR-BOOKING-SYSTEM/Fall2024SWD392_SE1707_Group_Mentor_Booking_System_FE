import ViewCriteriasTable from '@/features/criterias/view-criterias/view-criterias-table'
import { useViewSemesterCriterias } from './use-view-semester-criterias'
import { Criteria } from '@/models/criteria.model'
import { getColor, getStatus } from '@/features/criterias/view-criterias/utils/criteria.util'
import { Chip } from '@nextui-org/chip'

interface ViewSemesterCriteriaProps {
  semesterID: number | undefined
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
    className: 'text-left w-64'
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
      )
    }
  })
}

export default function ViewSemesterCriteria({ semesterID }: ViewSemesterCriteriaProps) {
  const { data, isLoading } = useViewSemesterCriterias(semesterID)

  return <ViewCriteriasTable data={data} isLoading={isLoading} columns={columns} transformData={transformData} />
}
