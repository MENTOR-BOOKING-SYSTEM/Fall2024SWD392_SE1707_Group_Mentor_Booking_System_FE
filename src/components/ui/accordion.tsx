import { Accordion as NextAccordion, AccordionItem, Avatar } from '@nextui-org/react'
import { Bookmark } from 'lucide-react'

export default function Accordion() {
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  return (
    <NextAccordion variant='splitted'>
      <AccordionItem
        key='1'
        aria-label='Accordion 1'
        title={<p className='text-lg font-bold'>Sprint 1</p>}
        startContent={
          <Avatar
            radius='md'
            size='sm'
            icon={<Bookmark className='text-white w-5 h-5' />}
            classNames={{
              base: 'bg-gradient-to-br from-[#a3e635] to-[#17c964] ',
              icon: 'text-black/80'
            }}
          />
        }
        className='w-full'
      >
        {defaultContent}
      </AccordionItem>
    </NextAccordion>
  )
}
