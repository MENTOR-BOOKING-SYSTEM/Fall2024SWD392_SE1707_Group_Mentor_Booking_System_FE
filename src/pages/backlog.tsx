import RichTextEditor from '@/components/shared/tiptap/rich-text-editor'
import Accordion from '@/components/ui/accordion'

export default function Backlog() {
  return (
    <div className='flex flex-col gap-3'>
      <Accordion />
      <Accordion />
      <Accordion />
      <RichTextEditor lsSectionName='project-idea' />
    </div>
  )
}
