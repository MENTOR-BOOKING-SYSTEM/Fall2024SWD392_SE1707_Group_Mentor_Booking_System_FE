import Button from '../ui/button'
import { Project } from '@/models/project.model'
import { getTextFromHTML } from '@/utils'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Chip, User } from '@nextui-org/react'
import { CircleChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate()

  return (
    <Card className='col-span-1 max-h-96'>
      <CardHeader>
        <div className='flex items-center gap-2'>
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
          className='w-full'
          type='button'
          color='primary'
          startContent={<CircleChevronRight className='w-4 h-4' />}
          onClick={() => navigate(`/${project.projectID}/detail`)}
        >
          View more
        </Button>
      </CardFooter>
    </Card>
  )
}
