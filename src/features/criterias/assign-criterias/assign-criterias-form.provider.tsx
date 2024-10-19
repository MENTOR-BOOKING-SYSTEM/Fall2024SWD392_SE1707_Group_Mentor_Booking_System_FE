import Button from '@/components/ui/button'
import AssignCriteriasForm from './assign-criterias-form'
import { useViewSemesterCriterias } from '@/features/semesters/view-semester-criterias/use-view-semester-criterias'
import { useViewSemesters } from '@/features/semesters/view-semesters/use-view-semesters'
import { Skeleton } from '@nextui-org/skeleton'
import { useEffect, useState } from 'react'
import { DATE_FORMAT } from '@/constants'
import { Select, SelectItem } from '@nextui-org/select'
import { format } from 'date-fns'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { AssignCriteriasFormValues, useAssignCriterias } from './use-assign-criterias'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Save } from 'lucide-react'

export default function AssignCriteriasFormProvider() {
  const { data: semesters, isLoading: isLoadingSemesters } = useViewSemesters()
  const [selectedSemesterID, setSelectedSemesterID] = useState<number | undefined>(undefined)

  const { data: semesterCriterias } = useViewSemesterCriterias(selectedSemesterID)
  const { methods, assignCriteriasMutation } = useAssignCriterias(selectedSemesterID, semesterCriterias)

  useEffect(() => {
    if (semesters) {
      const currentSemester = semesters.find((semester) => {
        const currentDate = new Date()
        const startDate = new Date(semester.startDate)
        const endDate = new Date(semester.endDate)

        return startDate <= currentDate && endDate >= currentDate
      })
      setSelectedSemesterID(currentSemester?.semesterID)
    }
  }, [semesters])

  const onSubmit: SubmitHandler<AssignCriteriasFormValues> = (data) => {
    assignCriteriasMutation.mutate(data)
  }

  if (isLoadingSemesters) {
    return (
      <Skeleton className='w-full rounded-lg'>
        <div className='h-12 w-full rounded-lg bg-default-300'></div>
      </Skeleton>
    )
  } else {
    return (
      <div className='flex flex-col gap-3'>
        <Select
          items={semesters}
          label='Semester'
          placeholder='Select a semester'
          selectedKeys={selectedSemesterID ? [String(selectedSemesterID)] : []}
          onChange={(e) => setSelectedSemesterID(parseInt(e.target.value))}
          disallowEmptySelection
        >
          {(semester) => (
            <SelectItem key={semester.semesterID}>
              {semester.semesterName +
                ' (' +
                format(semester.startDate, DATE_FORMAT.DEFAULT) +
                ' to ' +
                format(semester.endDate, DATE_FORMAT.DEFAULT) +
                ')'}
            </SelectItem>
          )}
        </Select>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Card className='min-h-96 flex flex-col justify-center'>
              <CardHeader className='font-bold text-xl'>Criterias list</CardHeader>
              <CardBody className='flex flex-col justify-center max-h-[600px]'>
                <AssignCriteriasForm />
              </CardBody>
              <CardFooter>
                <Button
                  startContent={<Save className='w-4 h-4' />}
                  color='primary'
                  className='ml-auto'
                  type='submit'
                  isDisabled={!methods.formState.isDirty}
                  isLoading={assignCriteriasMutation.isPending}
                >
                  Assign criterias
                </Button>
              </CardFooter>
            </Card>
          </form>
        </FormProvider>
      </div>
    )
  }
}
