import RichTextEditor from '@/components/shared/tiptap/rich-text-editor'
import Tooltip from '@/components/shared/tooltip'
import GetAllTechnologies from '@/features/technologies/get-all-techonologies/get-all-technologies'
import { TOOLTIP, TRANSPARENT_INPUT_CLASS_NAME } from '@/constants'
import { useAuth } from '@/hooks/use-auth'
import { Code } from '@nextui-org/code'
import { Input } from '@nextui-org/input'
import { Controller, useFormContext } from 'react-hook-form'
import { SubmitProjectFormValues } from './use-submit-project'

export default function SubmitProjectForm() {
  const { user } = useAuth()
  const {
    formState: { errors },
    control
  } = useFormContext<SubmitProjectFormValues>()

  const getErrorState = (name: keyof SubmitProjectFormValues) => {
    return errors[name]
  }

  return (
    <>
      <Controller
        control={control}
        name='technologies'
        render={({ field: { onChange } }) => <GetAllTechnologies onChange={onChange} />}
      />
      <Controller
        control={control}
        name='projectName'
        render={({ field: { onChange, ref } }) => (
          <Input
            ref={ref}
            onChange={onChange}
            autoFocus
            placeholder='Enter your project name here...'
            className='mb-5'
            classNames={{
              inputWrapper: TRANSPARENT_INPUT_CLASS_NAME,
              input: 'text-5xl font-bold p-0 h-full w-full'
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
                <Tooltip content={TOOLTIP.CONTEXT}>
                  <Code color='primary'>CONTEXT</Code>
                </Tooltip>
              }
            />
          )}
        />
        {/* <Controller
          control={control}
          name='problems'
          render={({ field: { onChange } }) => (
            <RichTextEditor
              lsSectionName={`${user?.user_id}-prb`}
              onChange={onChange}
              editorTag={
                <Tooltip content={TOOLTIP.PROBLEMS}>
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
              onChange={onChange}
              editorTag={
                getErrorState('actors') ? (
                  <Code color='danger'>ACTORS IS REQUIRED</Code>
                ) : (
                  <Tooltip content={TOOLTIP.ACTORS}>
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
              onChange={onChange}
              editorTag={
                getErrorState('funcRequirements') ? (
                  <Code color='danger'>FUNCTIONAL REQUIREMENTS IS REQUIRED</Code>
                ) : (
                  <Tooltip content={TOOLTIP.FUNCTIONAL_REQUIREMENTS}>
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
                <Tooltip content={TOOLTIP.NON_FUNCTIONAL_REQUIREMENTS}>
                  <Code color='primary'>NON-FUNCTIONAL REQUIREMENTS</Code>
                </Tooltip>
              }
            />
          )}
        /> */}
      </div>
    </>
  )
}
