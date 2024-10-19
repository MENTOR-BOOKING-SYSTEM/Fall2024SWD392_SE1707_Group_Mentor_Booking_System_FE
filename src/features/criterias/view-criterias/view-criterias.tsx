import CreateCriteria from '../create-criteria/create-criteria-form.provider'
import FilterCriteria from '../filter-criteria/filter-criteria'
import ViewCriteriasTable from './view-criterias-table'
import { useViewCriterias } from './use-view-criterias'

export default function ViewCriterias() {
  const { data, isLoading } = useViewCriterias()

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-3 justify-between'>
        <FilterCriteria />
        <CreateCriteria isDisabled={isLoading} />
      </div>
      <ViewCriteriasTable data={data} isLoading={isLoading} />
    </div>
  )
}
