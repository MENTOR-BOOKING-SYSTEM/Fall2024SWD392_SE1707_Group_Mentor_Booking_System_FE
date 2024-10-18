import { useViewCriterias } from './use-view-criterias'
import ViewCriteriasTable from './view-criterias-table'

export default function ViewCriterias() {
  const { data, isLoading } = useViewCriterias()

  return (
    <div className=''>
      <ViewCriteriasTable data={data} isLoading={isLoading} />
    </div>
  )
}
