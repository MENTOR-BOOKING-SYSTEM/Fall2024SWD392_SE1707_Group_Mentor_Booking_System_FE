import { Avatar, AvatarGroup } from '@nextui-org/avatar'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { MoveRight } from 'lucide-react'
import { useViewProjectDetail } from './use-view-project-detail'
import { parse } from 'node-html-parser'
import { Chip } from '@nextui-org/chip'
import { Divider } from '@nextui-org/divider'

interface ViewProjectDetailProps {
  projectID: string
}

export default function ViewProjectDetail({ projectID }: ViewProjectDetailProps) {
  console.log(projectID)
  const {
    '0': { data: projectDetail, isLoading: isLoadingDetail },
    '1': { data: projectOwner, isLoading: isLoadingOwner },
    '2': { data: projectReviewer, isLoading: isLoadingReviewer },
    '3': { data: projectTechnologies, isLoading: isLoadingTechnologies }
  } = useViewProjectDetail(projectID)

  return (
    <div className='p-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-3'>
        <p className='text-4xl font-semibold'>{projectDetail?.project.projectName}</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            {projectOwner && projectOwner?.length > 1 ? (
              <AvatarGroup isBordered max={3}>
                {projectOwner?.map((owner) => (
                  <Avatar size='sm' isBordered color='primary' src={owner.avatarUrl || ''} />
                ))}
              </AvatarGroup>
            ) : (
              <Avatar size='sm' isBordered color='primary' src={(projectOwner && projectOwner[0].avatarUrl) || ''} />
            )}
            <MoveRight className='text-primary' />
            {projectReviewer && projectReviewer?.length > 1 ? (
              <AvatarGroup isBordered max={3}>
                {projectReviewer?.map((owner) => (
                  <Avatar size='sm' isBordered color='primary' src={owner.avatarUrl || ''} />
                ))}
              </AvatarGroup>
            ) : (
              <Avatar
                size='sm'
                isBordered
                color='primary'
                src={(projectReviewer && projectReviewer[0].avatarUrl) || ''}
              />
            )}
          </div>
          <div className='flex items-center gap-2'>
            {projectTechnologies && projectTechnologies.map((tech) => <Chip color='primary'>{tech.techName}</Chip>)}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3 mt-3'>
        <Card>
          <CardHeader>
            <Chip color='primary'>
              <p className='text-lg font-semibold'>Context</p>
            </Chip>
          </CardHeader>
          <Divider />
          <CardBody>
            <p dangerouslySetInnerHTML={{ __html: projectDetail?.project.context || '' }}></p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Chip color='primary'>
              <p className='text-lg font-semibold'>Problems</p>
            </Chip>
          </CardHeader>
          <Divider />
          <CardBody>
            <p dangerouslySetInnerHTML={{ __html: projectDetail?.project.problems || '' }}></p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Chip color='primary'>
              <p className='text-lg font-semibold'>Actors</p>
            </Chip>
          </CardHeader>
          <Divider />
          <CardBody>
            <p dangerouslySetInnerHTML={{ __html: projectDetail?.project.actors || '' }}></p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Chip color='primary'>
              <p className='text-lg font-semibold'>Functional requirements</p>
            </Chip>
          </CardHeader>
          <Divider />
          <CardBody>
            <p dangerouslySetInnerHTML={{ __html: projectDetail?.project.funcRequirements || '' }}></p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Chip color='primary'>
              <p className='text-lg font-semibold'>Non-Functional requirements</p>
            </Chip>
          </CardHeader>
          <Divider />
          <CardBody>
            <p dangerouslySetInnerHTML={{ __html: projectDetail?.project.nonFuncRequirements || '' }}></p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
