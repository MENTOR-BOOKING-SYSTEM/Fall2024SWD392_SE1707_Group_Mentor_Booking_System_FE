import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Link } from 'react-router-dom'

// Define the schema for password validation using Zod
const schema = z
  .object({
    oldPassword: z.string().min(8, { message: 'least 8 characters long' }),
    password: z.string().min(8, { message: 'least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: '8 characters long' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "New passwords don't match",
    path: ['confirmPassword']
  })

type PasswordUpdateForm = {
  oldPassword: string
  password: string
  confirmPassword: string
}

function UpdatePassword() {
  const [userData, setUserData] = useState({
    oldPassword: 'OldPassword123'
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordUpdateForm>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: PasswordUpdateForm) => {
    if (data.oldPassword !== userData.oldPassword) {
      alert('Old password is incorrect.')
      return
    }

    console.log('Password updated:', data)
    // add API
  }

  return (
    <div>
      <h1 style={{ fontSize: '30px', fontWeight: '600', marginBottom: '30px' }}>Update Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '20px' }}>Old Password</label>
          <br />
          <input
            type='password'
            {...register('oldPassword')}
            style={{
              backgroundColor: '#f7f7f7',
              padding: '10px',
              borderRadius: '10px',
              fontSize: '20px',
              width: '400px',
              marginTop: '10px',
              borderColor: errors.oldPassword ? 'red' : '#ccc'
            }}
          />
          <br />
          {errors.oldPassword && <span style={{ color: 'red' }}>{errors.oldPassword.message}</span>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '20px' }}>New Password</label>
          <br />
          <input
            type='password'
            {...register('password')}
            style={{
              backgroundColor: '#f7f7f7',
              padding: '10px',
              borderRadius: '10px',
              fontSize: '20px',
              width: '400px',
              marginTop: '10px',
              borderColor: errors.password ? 'red' : '#ccc'
            }}
          />
          <br />
          {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '20px' }}>Confirm Password</label>
          <br />
          <input
            type='password'
            {...register('confirmPassword')}
            style={{
              backgroundColor: '#f7f7f7',
              padding: '10px',
              borderRadius: '10px',
              fontSize: '20px',
              width: '400px',
              marginTop: '10px',
              borderColor: errors.confirmPassword ? 'red' : '#ccc'
            }}
          />
          <br />
          {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span>}
        </div>
        <div style={{ marginTop: '30px', display: 'flex', gap: '30px' }}>
          <Button color='default' type='button'>
            <Link to='/profile'>Cancel</Link>
          </Button>
          <Button color='primary' type='submit'>
            Update Password
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePassword
