import EmptyContainer from '@/components/shared/empty-container'
import { GetAccountsPagination } from '@/models/api/dashboard/res.model'
import { Account } from '@/models/user.model'
import { Pagination, Spinner } from '@nextui-org/react'
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'

interface ViewAccountsTableProps {
  columns: any[]
  data: GetAccountsPagination | undefined
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  isLoading: boolean
  transformData: (accounts: Account[]) => any[]
}

export default function ViewAccountsTable({
  data,
  isLoading,
  transformData,
  page,
  setPage,
  columns
}: ViewAccountsTableProps) {
  const transformedData = transformData(data?.accounts || [])

  return (
    <Table
      classNames={{
        table: 'min-h-60'
      }}
      color='default'
      selectionMode='single'
      disallowEmptySelection
      aria-label='Accounts Table'
      bottomContent={
        data?.pages || 0 > 0 ? (
          <div className='flex w-full justify-center'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='primary'
              page={page}
              total={data?.pages || 0}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
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
        {(account) => (
          <TableRow key={account.userID}>
            {(columnKey) => (
              <TableCell className='max-w-32' key={columnKey}>
                {getKeyValue(account, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
