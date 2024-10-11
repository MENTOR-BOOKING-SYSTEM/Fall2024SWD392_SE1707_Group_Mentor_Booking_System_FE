import { Button } from '@nextui-org/button'
import { Link } from 'react-router-dom'

function SelectUpdate() {
  return (
    <div>
      <div style={{ marginTop: '30px' }}>
        <Button color='secondary' type='button' style={{ width: '300px' }}>
          <Link to='/edit-profile'>Update Information Profile</Link>
        </Button>
        <br />
        <br />
        <Button color='secondary' type='submit' style={{ width: '300px' }}>
          <Link to='/edit-profile-password'>Update Password</Link>
        </Button>
      </div>
    </div>
  )
}

export default SelectUpdate
