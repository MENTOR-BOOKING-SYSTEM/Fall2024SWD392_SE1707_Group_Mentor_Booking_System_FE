import ViewProjectDetail from '@/features/projects/view-project-detail/view-project-detail'
import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { projectID } = useParams()

  return (
    <div className='px-72'>
      <ViewProjectDetail projectID={projectID || ''} />
    </div>
  )
}
