import RichTextEditor from '@/components/shared/tiptap/rich-text-editor'
import Tooltip from '@/components/shared/tooltip'
import GetAllTechnologies from '@/features/technologies/get-all-techonologies/get-all-technologies'
import GetStudentsByGroup from '@/features/users/students/get-students-by-group/get-students-by-group'
import GetAllMentors from '@/features/users/mentors/get-all-mentors/get-all-mentors'
import FormError from '@/components/forms/form-error'
import { ROLES, TOOLTIP, TRANSPARENT_INPUT_CLASS_NAME } from '@/constants'
import { useAuth } from '@/hooks/use-auth'
import { Code } from '@nextui-org/code'
import { Input } from '@nextui-org/input'
import { Controller, useFormContext } from 'react-hook-form'
import { SubmitProjectFormValues } from './use-submit-project'

export default function SubmitProjectForm() {
  const { user } = useAuth()
  const {
    control,
    formState: { errors },
    watch
  } = useFormContext<SubmitProjectFormValues>()

  const getErrorState = (name: keyof SubmitProjectFormValues) => {
    return errors[name]
  }

  console.log(watch('collaborators'))

  return (
    <>
      <div className='flex items-center gap-4 h-32'>
        <Controller
          control={control}
          name='technologies'
          render={({ field: { onChange } }) => <GetAllTechnologies onChange={onChange} />}
        />
        <FormError<SubmitProjectFormValues> identifier='technologies' errors={errors} />
        {!user?.role.includes('Business') && (
          <Controller
            control={control}
            name='collaborators'
            render={({ field: { onChange, value } }) => {
              if (user?.role.includes(ROLES.MENTOR)) {
                return <GetAllMentors onChange={onChange} isMultiline isForMentor />
              } else {
                return <GetStudentsByGroup onChange={onChange} />
              }
            }}
          />
        )}
        {!user?.role.includes('Mentor') && (
          <div className='flex flex-col gap-2 relative w-full'>
            <Controller
              control={control}
              name='mentorID'
              render={({ field: { onChange } }) => <GetAllMentors onChange={onChange} />}
            />
            <FormError<SubmitProjectFormValues> errors={errors} identifier='mentorID' className='absolute -bottom-5' />
          </div>
        )}
      </div>
      <Controller
        control={control}
        name='projectName'
        render={({ field: { onChange, ref } }) => (
          <Input
            ref={ref}
            onChange={onChange}
            autoFocus
            spellCheck={false}
            placeholder='Enter your project name here...'
            className='mb-5'
            classNames={{
              inputWrapper: TRANSPARENT_INPUT_CLASS_NAME,
              input: 'text-6xl font-bold p-0 h-full w-full'
            }}
          />
        )}
      />
      <div className='flex flex-col gap-10'>
        <Controller
          control={control}
          name='context'
          render={({ field: { onChange } }) => (
            <RichTextEditor
              lsSectionName={`${user?.user_id}-ctx`}
              onChange={onChange}
              editorTag={
                <Tooltip className='w-96' content={TOOLTIP.CONTEXT}>
                  <Code color='primary'>CONTEXT</Code>
                </Tooltip>
              }
            />
          )}
        />
        <Controller
          control={control}
          name='problems'
          render={({ field: { onChange } }) => (
            <RichTextEditor
              lsSectionName={`${user?.user_id}-prb`}
              onChange={onChange}
              editorTag={
                <Tooltip className='w-96' content={TOOLTIP.PROBLEMS}>
                  <Code color='primary'>PROBLEMS</Code>
                </Tooltip>
              }
            />
          )}
        />
        <Controller
          control={control}
          name='actors'
          render={({ field: { onChange } }) => (
            <RichTextEditor
              lsSectionName={`${user?.user_id}-act`}
              className={getErrorState('actors') ? 'border-2 border-danger-300' : ''}
              onChange={onChange}
              editorTag={
                getErrorState('actors') ? (
                  <Code color='danger'>ACTORS IS REQUIRED</Code>
                ) : (
                  <Tooltip className='w-96' content={TOOLTIP.ACTORS}>
                    <Code color='primary'>ACTORS</Code>
                  </Tooltip>
                )
              }
            />
          )}
        />
        <Controller
          control={control}
          name='funcRequirements'
          render={({ field: { onChange } }) => (
            <RichTextEditor
              lsSectionName={`${user?.user_id}-fr`}
              className={getErrorState('funcRequirements') ? 'border-2 border-danger-300' : ''}
              onChange={onChange}
              editorTag={
                getErrorState('funcRequirements') ? (
                  <Code color='danger'>FUNCTIONAL REQUIREMENTS IS REQUIRED</Code>
                ) : (
                  <Tooltip className='w-96' content={TOOLTIP.FUNCTIONAL_REQUIREMENTS}>
                    <Code color='primary'>FUNCTIONAL REQUIREMENTS</Code>
                  </Tooltip>
                )
              }
            />
          )}
        />
        <Controller
          control={control}
          name='nonFuncRequirements'
          render={({ field: { onChange } }) => (
            <RichTextEditor
              lsSectionName={`${user?.user_id}-nfr`}
              onChange={onChange}
              editorTag={
                <Tooltip className='w-96' content={TOOLTIP.NON_FUNCTIONAL_REQUIREMENTS}>
                  <Code color='primary'>NON-FUNCTIONAL REQUIREMENTS</Code>
                </Tooltip>
              }
            />
          )}
        />
      </div>
    </>
  )
}
