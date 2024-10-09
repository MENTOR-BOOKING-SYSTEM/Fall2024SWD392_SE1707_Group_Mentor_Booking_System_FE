import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import Select from '@/components/ui/select'
import InputLinkForm from './input-link-form'
import { urlSchema } from '@/models/schemas/auth.schema'
import { SelectMenuItem } from '@/models/ui.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Editor } from '@tiptap/core'
import { FloatingMenu as TiptapFloatingMenu, BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import { Bold, Image, Italic, Link2, List, ListOrdered, Underline, Youtube } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface BubbleMenuProps {
  editor: Editor | null
  type: 'floating' | 'bubble'
}

interface EditorMenu {
  name: string
  icon: React.ReactNode
  onClick?: () => void
  isActive: boolean
  showDivider?: boolean
}

export type UrlFormValues = z.infer<typeof urlSchema>

export default function TiptapMenu({ editor, type }: BubbleMenuProps) {
  const methods = useForm<UrlFormValues>({ resolver: zodResolver(urlSchema), defaultValues: { url: '' } })

  if (!editor) return null

  const handleSubmitUrl: SubmitHandler<UrlFormValues> = ({ url }) => {
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url || '' })
      .run()
  }

  const handleSubmitImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const handleSubmitYTVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480
      })
    }
  }

  const EDITOR_MENU: EditorMenu[] = [
    {
      name: 'bold',
      icon: <Bold className='w-5 h-5' />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold')
    },
    {
      name: 'italic',
      icon: <Italic className='w-5 h-5' />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic')
    },
    {
      name: 'underline',
      icon: <Underline className='w-5 h-5' />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
      showDivider: true
    },
    {
      name: 'bulletList',
      icon: <List className='w-5 h-5' />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList')
    },
    {
      name: 'orderedList',
      icon: <ListOrdered className='w-5 h-5' />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      showDivider: true
    },
    {
      name: 'link',
      icon: (
        <Modal<UrlFormValues>
          className='bg-transparent text-zinc-500'
          body={<InputLinkForm />}
          methods={methods}
          onSubmit={handleSubmitUrl}
        >
          <Link2 className='w-5 h-5' />
        </Modal>
      ),
      isActive: editor.isActive('link'),
      showDivider: true
    },
    {
      name: 'image',
      icon: <Image className='w-5 h-5' />,
      onClick: handleSubmitImage,
      isActive: editor.isActive('image')
    },
    {
      name: 'video',
      icon: <Youtube className='w-5 h-5' />,
      onClick: handleSubmitYTVideo,
      isActive: editor.isActive('video')
    }
  ]

  const TIPTAP_EDITOR_MENU_ITEMS: SelectMenuItem[] = [
    { key: 'paragraph', label: 'Paragraph', onClick: () => editor.chain().focus().setParagraph().run() },
    { key: 'heading-2', label: 'Heading 2', onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { key: 'heading-3', label: 'Heading 3', onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { key: 'heading-4', label: 'Heading 4', onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run() }
  ]

  const content = (
    <Card className='p-1.5 w-[500px]'>
      <div className='flex items-center gap-1'>
        <Select
          selectItems={TIPTAP_EDITOR_MENU_ITEMS}
          className='w-48'
          defaultSelectedKeys={[TIPTAP_EDITOR_MENU_ITEMS[0].key]}
        />
        {EDITOR_MENU.map((item) => (
          <div key={item.name} className='flex items-center gap-1'>
            <Button
              onClick={item.onClick ? item.onClick : undefined}
              className={item.isActive ? 'bg-primary-100 text-primary' : 'bg-transparent text-zinc-500'}
              isIconOnly
              size='sm'
            >
              {item.icon}
            </Button>
            {item.showDivider && <Divider orientation='vertical' className='h-8' />}
          </div>
        ))}
      </div>
    </Card>
  )

  return (
    <div id='parent'>
      {type === 'bubble' ? (
        <TiptapBubbleMenu tippyOptions={{ appendTo: 'parent' }} editor={editor}>
          {content}
        </TiptapBubbleMenu>
      ) : (
        <TiptapFloatingMenu tippyOptions={{ appendTo: 'parent' }} editor={editor}>
          {content}
        </TiptapFloatingMenu>
      )}
    </div>
  )
}
