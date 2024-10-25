import Button from '@/components/ui/button'
import SubmitProjectForm from './submit-project-form'
import { SubmitProjectForMentorFormValues, useSubmitProject } from './use-submit-project'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { Send } from 'lucide-react'

export default function SubmitProjectFormProvider() {
  const { methods, submitProjectMutation } = useSubmitProject()

  const onSubmit: SubmitHandler<SubmitProjectForMentorFormValues> = async (data) => {
    submitProjectMutation.mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <form className='w-full flex flex-col gap-3' onSubmit={methods.handleSubmit(onSubmit)}>
        <SubmitProjectForm />
        <Button
          isLoading={submitProjectMutation.isPending}
          startContent={<Send className='w-4 h-4' />}
          color='primary'
          className='ml-auto'
          type='submit'
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  )
}
