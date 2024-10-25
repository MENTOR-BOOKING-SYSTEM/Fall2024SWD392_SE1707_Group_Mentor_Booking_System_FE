import EmptyContainer from '@/components/shared/empty-container'
import { Criteria } from '@/models/criteria.model'
import { Spinner } from '@nextui-org/react'
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'

interface ViewCriteriasTableProps {
  data: Criteria[] | null | undefined
  columns: any[]
  isLoading: boolean
  transformData: (criterias: Criteria[]) => any[]
}

export default function ViewCriteriasTable({ data, isLoading, columns, transformData }: ViewCriteriasTableProps) {
  const transformedData = transformData(data || [])

  return (
    <Table
      classNames={{
        table: 'min-h-60'
      }}
      color='primary'
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
      <TableBody
        items={transformedData}
        isLoading={isLoading}
        loadingContent={<Spinner />}
        emptyContent={<EmptyContainer />}
      >
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
  )
}
