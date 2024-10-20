import ViewProjectDetail from '../view-project-detail/view-project-detail'
import AcceptProject from './accept-project/accept-project'
import ConsiderProject from './consider-project/consider-project'
import RejectProject from './reject-project/reject-project'
import { FormProvider } from 'react-hook-form'
import { useGetCurrentSemester } from '@/features/semesters/get-current-semester/use-get-current-semester'
import { useViewSemesterCriterias } from '@/features/semesters/view-semester-criterias/use-view-semester-criterias'
import { useReviewProject } from './use-review-project'
import { useParams } from 'react-router-dom'

export default function ReviewProject() {
  const { data: currentSemester } = useGetCurrentSemester()
  const { data: semesterCriterias } = useViewSemesterCriterias(currentSemester?.semesterID)
  const { projectId } = useParams()
  const { methods } = useReviewProject(projectId)

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-end gap-3'>
        <FormProvider {...methods}>
          <RejectProject criterias={semesterCriterias} />
          <ConsiderProject criterias={semesterCriterias} />
          <AcceptProject criterias={semesterCriterias} />
        </FormProvider>
      </div>
      <ViewProjectDetail />
    </div>
  )
}
