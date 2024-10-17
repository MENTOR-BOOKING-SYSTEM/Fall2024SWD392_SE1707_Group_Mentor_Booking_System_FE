import Footer from '@/components/shared/footer'
import { Divider } from '@nextui-org/divider'

interface DefaultLayoutProps {
  header: React.ReactNode
  sidebar: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
}

export default function DefaultLayout({ header, sidebar, footer = <Footer />, children }: DefaultLayoutProps) {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <section className='flex flex-col flex-1'>
        {header}
        <div className='flex flex-1'>
          <div className='flex'>
            {sidebar}
            <Divider orientation='vertical' />
          </div>
          <div className='flex-1 p-4'>{children}</div>
        </div>
      </section>
      {footer}
    </div>
  )
}
