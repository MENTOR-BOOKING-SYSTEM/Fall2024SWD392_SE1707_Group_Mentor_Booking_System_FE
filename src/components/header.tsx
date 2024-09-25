import Meetup from '/meetup.svg'

export default function Header() {
  return (
    <div className='flex items-center gap-3'>
      <img src={Meetup} alt='Meetup' className='h-14' />
    </div>
  )
}
