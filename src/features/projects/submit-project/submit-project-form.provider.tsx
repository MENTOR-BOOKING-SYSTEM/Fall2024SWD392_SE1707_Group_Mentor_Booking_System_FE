import SubmitProjectForm from './submit-project-form'
import Button from '@/components/ui/button'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { SubmitProjectFormValues, useSubmitProject } from './use-submit-project'
import { Send } from 'lucide-react'

export default function SubmitProjectFormProvider() {
  const { methods, submitProjectMutation } = useSubmitProject()

  const onSubmit: SubmitHandler<SubmitProjectFormValues> = async (data) => {
    // submitProjectMutation.mutate(data)
    console.log(data)
  }

  return (
    <div className='overflow-y-auto px-96 flex flex-col gap-3'>
      <FormProvider {...methods}>
        <form className='w-full flex flex-col gap-3' onSubmit={methods.handleSubmit(onSubmit)}>
          <SubmitProjectForm />
          <Button startContent={<Send className='w-4 h-4' />} color='primary' className='ml-auto' type='submit'>
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
