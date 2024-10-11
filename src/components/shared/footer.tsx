import { Chip } from '@nextui-org/chip'

export default function Footer() {
  return (
    <div className='bg-primary-300 p-2 text-center font-semibold mt-32'>
      <Chip color='primary'>
        <p className='font-bold'>Dev Environment</p>
      </Chip>
    </div>
  )
}
