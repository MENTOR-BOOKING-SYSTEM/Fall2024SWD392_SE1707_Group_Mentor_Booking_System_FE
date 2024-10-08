import Wrapper from './wrapper'
import Meetup from '/meetup.svg'

export default function PageLoader() {
  return (
    <Wrapper className='fixed inset-0 flex items-center justify-center bg-background z-50'>
      <img src={Meetup} alt='Meetup' className='w-20 h-20' />
    </Wrapper>
  )
}
