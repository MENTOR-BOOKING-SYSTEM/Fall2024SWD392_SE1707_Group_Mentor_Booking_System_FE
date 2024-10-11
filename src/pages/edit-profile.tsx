import React, { useState } from 'react'
import { Button } from '@nextui-org/button'
import { Link } from 'react-router-dom'

interface UserProfile {
  avatarUrl: string
  firstName: string
  lastName: string
}

function EditProfile() {
  const [user, setUser] = useState<UserProfile>({
    avatarUrl: 'https://wallpapershome.com/images/wallpapers/boy-2560x1440-space-user-avatar-4k-25083.jpg',
    firstName: 'John',
    lastName: 'Wick'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          avatarUrl: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Profile updated:', user)
  }

  return (
    <div>
      <h1 style={{ fontSize: '30px', fontWeight: '600', marginBottom: '30px' }}>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          <img
            style={{
              borderRadius: '50%',
              border: '1px solid #333',
              objectFit: 'cover',
              height: '200px',
              width: '200px'
            }}
            src={user.avatarUrl}
            alt={`${user.firstName} ${user.lastName}`}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            style={{ backgroundColor: '#f7f7f7', padding: '10px', borderRadius: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '20px' }}>First Name</label>
          <input
            style={{
              backgroundColor: '#f7f7f7',
              padding: '10px',
              borderRadius: '10px',
              fontSize: '20px',
              width: '200px'
            }}
            type='text'
            name='firstName'
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '20px' }}>Last Name</label>
          <input
            style={{
              backgroundColor: '#f7f7f7',
              padding: '10px',
              borderRadius: '10px',
              fontSize: '20px',
              width: '200px'
            }}
            type='text'
            name='lastName'
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: '30px', display: 'flex', gap: '30px' }}>
          <Button color='default' type='button'>
            <Link to='/profile'>Cancel</Link>
          </Button>
          <Button color='primary' type='submit'>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
