import EmptyContainer from '@/components/shared/empty-container'
import Button from '@/components/ui/button'
import { getTextFromHTML } from '@/utils'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import { Divider } from '@nextui-org/divider'
import { User } from '@nextui-org/react'
import { Skeleton } from '@nextui-org/skeleton'
import { CircleChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useViewSubmission } from './use-view-submission'

export default function ViewSubmission() {
  const navigate = useNavigate()
  const { data, isLoading } = useViewSubmission()

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
          <Card className='col-span-1 max-h-96'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Chip variant='shadow' color='primary'>
                  <p className='font-bold'>Project Name</p>
                </Chip>
                <p className='font-semibold text-xl'>{project.projectName.toUpperCase()}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className='line-clamp-4'>{getTextFromHTML(project.context)}</p>
              <div className='flex items-center justify-between mt-4'>
                <User
                  avatarProps={{
                    radius: 'full',
                    src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
                    isBordered: true,
                    color: 'primary',
                    size: 'sm'
                  }}
                  description='mentor-fpt@gmail.com'
                  name='Mentor'
                >
                  mentor-fpt@gmail.com
                </User>
                <div className='flex items-center gap-2'>
                  <Chip size='sm' className='p-2' color='primary' variant='flat'>
                    <p className='font-medium'>Java</p>
                  </Chip>
                  <Chip size='sm' className='p-2' color='primary' variant='flat'>
                    <p className='font-medium'>Angular</p>
                  </Chip>
                  <Chip size='sm' className='p-2' color='primary' variant='flat'>
                    <p className='font-medium'>MySQL</p>
                  </Chip>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => navigate(`/${project.projectID}/detail`)}
                className='w-full'
                color='primary'
                startContent={<CircleChevronRight className='w-4 h-4' />}
              >
                View more
              </Button>
            </CardFooter>
          </Card>
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
