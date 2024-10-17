import Button from '@/components/ui/button'
import { Input } from '@nextui-org/input'
import { Filter, Search } from 'lucide-react'

export default function FilterCriteria() {
  return (
    <div className='flex items-center gap-3'>
      <Input
        startContent={<Search className='w-4 h-4' />}
        placeholder='Search...'
        className='min-w-96'
        spellCheck={false}
      />
      <Button color='primary' startContent={<Filter className='min-w-4 min-h-4' />}>
        Filter
      </Button>
    </div>
  )
}
