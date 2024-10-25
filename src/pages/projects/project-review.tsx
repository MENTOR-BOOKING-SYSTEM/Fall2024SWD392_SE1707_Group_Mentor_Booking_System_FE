import Button from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function ProjectReview() {
  const navigate = useNavigate()

  return (
    <div>
      <p>View list of projects that need reviewing</p>
      <Button color='primary' onClick={() => navigate('1')}>
        Go
      </Button>
    </div>
  )
}
