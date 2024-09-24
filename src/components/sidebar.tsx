import Meetup from '/meetup.svg'

export default function Sidebar() {
  return (
    <div className='flex flex-col p-3.5'>
      <div className='flex items-center gap-3'>
        <img src={Meetup} alt='Meetup' className='h-14' />
      </div>
    </div>
  )
}
