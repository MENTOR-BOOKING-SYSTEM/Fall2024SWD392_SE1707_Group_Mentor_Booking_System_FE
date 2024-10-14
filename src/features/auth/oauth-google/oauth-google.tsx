import Button from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { useOAuthGoogle } from './use-oauth-google'
import { Link } from 'react-router-dom'

export default function OAuthGoogle() {
  const googleUrl = useOAuthGoogle()

  return (
    <Link to={googleUrl}>
      <Button className='w-full border-1 mb-8' variant='bordered'>
        <div className='flex items-center w-full'>
          <Icons.google className='w-6 h-6 mr-2' />
          <label className='flex-1 cursor-pointer'>Continue with Google</label>
        </div>
      </Button>
    </Link>
  )
}
