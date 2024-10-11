import TiptapMenu from './tiptap-menu'
import CharacterCount from '@tiptap/extension-character-count'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import Youtube from '@tiptap/extension-youtube'
import Image from '@tiptap/extension-image'
import FloatingMenu from '@tiptap/extension-floating-menu'
import { EditorContent, useEditor } from '@tiptap/react'
import { CircularProgress } from '@nextui-org/progress'
import { cn } from '@/utils'
import { useLocalStorage } from 'usehooks-ts'
import { TiptapContentModel } from '@/models/base.model'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'

const limit = 20000

// NOTE: the Image extension only support uploading images via URL, if you want to upload to your server use FileHandler
// https://tiptap.dev/docs/editor/extensions/functionality/filehandler

const extensions = [
  StarterKit,
  Underline,
  Link.configure({ openOnClick: true, autolink: true, defaultProtocol: 'https' }),
  Placeholder.configure({ placeholder: 'Start typing your content here...' }),
  CharacterCount.configure({
    limit
  }),
  Image,
  Youtube.configure({
    controls: false,
    nocookie: true
  }),
  FloatingMenu.configure({})
]

interface RichTextEditorProps {
  lsSectionName: string
  className?: string
  editorTag: React.ReactNode
  onChange: (event: any) => void
  defaultContent?: string
}

export default function RichTextEditor({
  lsSectionName,
  editorTag,
  className,
  defaultContent,
  onChange
}: RichTextEditorProps) {
  const [content, setContent, removeContent] = useLocalStorage<TiptapContentModel>(lsSectionName, {})
  const editor = useEditor({
    extensions,
    content: content[lsSectionName] || defaultContent,
    onFocus: ({ editor }) => editor.commands.focus('end'),
    editorProps: {
      attributes: {
        class: 'w-full h-full p-4 border-none focus:ring-0 focus:outline-none',
        spellCheck: 'false'
      }
    },
    onUpdate: ({ editor }) => {
      setTimeout(() => {
        if (editor.getHTML() === '<p></p>') {
          removeContent()
          onChange(null)
        } else {
          setContent({ [lsSectionName]: editor.getHTML() })
          onChange(editor.getHTML())
        }
      }, 5000)
    }
  })

  if (!editor) return null

  const percentage = editor ? Math.round((100 / limit) * editor.storage.characterCount.characters()) : 0
  const threshold = 100

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader>
        <TiptapMenu editor={editor} type='menu' />
      </CardHeader>
      <Divider />
      <CardBody className='min-h-72'>
        <EditorContent editor={editor} autoFocus />
        {/* <TiptapMenu editor={editor} type='floating' /> */}
      </CardBody>
      <div className='flex items-center justify-between p-4'>
        {editorTag}
        <div className='flex items-center gap-2'>
          <CircularProgress
            aria-label='Loading...'
            className='stroke-2'
            size='sm'
            value={percentage}
            color={percentage === threshold ? 'danger' : 'primary'}
          />
          {percentage === threshold ? (
            <p className={cn('text-xs font-semibold', percentage >= threshold ? 'text-danger-200 font-bold' : '')}>
              Too many words
            </p>
          ) : (
            <p className={cn('text-xs font-semibold', percentage >= threshold ? 'text-danger-200 font-bold' : '')}>
              Has {editor.storage.characterCount.words()} words
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
