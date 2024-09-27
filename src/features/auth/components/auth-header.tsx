import Meetup from '/meetup.svg'

const className = 'text-primary cursor-pointer text-xs font-bold'

export default function AuthHeader({ title }: { title: string }) {
  return (
    <div className='flex flex-col gap-2 mb-10'>
      <img src={Meetup} alt='Meetup' className='w-20 h-20 mx-auto mb-5' />
      <label className='block text-2xl font-bold'>{title}</label>
      <label className='text-xs font-normal'>
        By continuing, you agree to our <label className={className}>User Agreement</label> and acknowledge that you
        understand the <label className={className}>Privacy Policy</label>.
      </label>
    </div>
  )
}
