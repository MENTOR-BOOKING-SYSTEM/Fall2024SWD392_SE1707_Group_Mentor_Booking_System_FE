import { Chip } from '@nextui-org/react'

interface StatusChipProps {
  status: string
  color: 'primary' | 'warning' | 'success'
}

const StatusChip: React.FC<StatusChipProps> = ({ status, color }) => {
  return (
    <Chip color={color} variant='flat' className='capitalize'>
      {status}
    </Chip>
  )
}

export default StatusChip
