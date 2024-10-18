import ViewCriteriasTable from './view-criterias-table'
import { useViewCriterias } from './use-view-criterias'

export default function ViewCriterias() {
  const { data, isLoading } = useViewCriterias()

  return <ViewCriteriasTable data={data} isLoading={isLoading} />
}
