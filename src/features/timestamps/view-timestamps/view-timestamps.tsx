import { Timestamp } from '@/models/timestamp.model'
import { useViewTimestamps } from './use-view-timestamps'
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { Spinner } from '@nextui-org/react'
import { PackageOpen } from 'lucide-react'

const columns = [
  {
    key: 'timestampID',
    label: 'ID',
    className: 'text-left w-16'
  },
  {
    key: 'timestampName',
    label: 'Timestamp',
    className: 'text-left'
  },
  {
    key: 'phase',
    label: 'Phase',
    className: 'text-center w-16'
  }
]

const transformData = (timestamps: Timestamp[]) => {
  return timestamps.map((timestamp) => {
    return {
      timestampID: timestamp.timestampID,
      timestampName: <p className='font-semibold'>{timestamp.timestampName}</p>,
      phase: <p className='text-center'>{timestamp.phase}</p>
    }
  })
}

export default function ViewTimestamps() {
  const { data, isLoading } = useViewTimestamps()
  const transformedData = transformData(data || [])

  return (
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
      <TableBody
        items={transformedData.sort((a, b) => a.timestampID - b.timestampID)}
        isLoading={isLoading}
        loadingContent={<Spinner />}
        emptyContent={
          <div className='flex flex-col items-center gap-2'>
            <PackageOpen className='w-10 h-10 stroke-1 text-default-300' />
            <p>No data available</p>
          </div>
        }
      >
        {(timestamp) => (
          <TableRow key={timestamp.timestampID}>
            {(columnKey) => (
              <TableCell className='max-w-32' key={columnKey}>
                {getKeyValue(timestamp, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
