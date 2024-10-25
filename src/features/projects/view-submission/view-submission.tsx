import EmptyContainer from '@/components/shared/empty-container'
import ProjectCard from '@/components/shared/project-card'
import { useUser } from '@/hooks/use-user'
import { Skeleton } from '@nextui-org/skeleton'
import { useViewSubmission } from './use-view-submission'

export default function ViewSubmission() {
  const { user } = useUser()
  const { data, isLoading } = useViewSubmission(user?.user_id)

  if (isLoading) {
    return (
      <div className='flex flex-col gap-3'>
        <Skeleton className='w-full rounded-lg'>
          <div className='h-24 w-full rounded-lg bg-default-300'></div>
        </Skeleton>
        <Skeleton className='w-full rounded-lg'>
          <div className='h-24 w-full rounded-lg bg-default-300'></div>
        </Skeleton>
        <Skeleton className='w-full rounded-lg'>
          <div className='h-24 w-full rounded-lg bg-default-300'></div>
        </Skeleton>
      </div>
    )
  } else if (data && data.length > 0) {
    return (
      <div className='grid grid-cols-2 gap-4 mt-3'>
        {data.map((project) => (
          <ProjectCard key={project.projectID} project={project} />
        ))}
      </div>
    )
  } else {
    return (
      <div className='h-full flex items-center justify-center'>
        <EmptyContainer
          className='w-16 h-16'
          text={<p className='font-medium text-medium text-default-300'>No submission available</p>}
        />
      </div>
    )
  }
}
