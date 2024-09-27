export type UserFormType = {
  id: number
  type: 'email' | 'text' | 'password'
  inputType: 'select' | 'input' | 'checkbox'
  options?: { value: string; label: string; id: string }[]
  label?: string // label to display
  placeholder: string
  name: string // name of the field (used in react-hook-form)
  autoFocus?: boolean
  layout?: 'row' | 'col'
  optional?: boolean
  endContent?: React.ReactNode
}

export const USER_LOGIN_FORM: UserFormType[] = [
  {
    id: 1,
    type: 'text',
    inputType: 'input',
    label: 'Email or username',
    placeholder: '',
    name: 'email',
    autoFocus: true
  },
  {
    id: 2,
    type: 'password',
    inputType: 'input',
    label: 'Password',
    placeholder: '',
    name: 'password'
  }
]

export const USER_FORGOT_PASSWORD_FORM: UserFormType[] = [
  {
    id: 1,
    type: 'text',
    inputType: 'input',
    label: 'Email',
    placeholder: 'example@gmail.com',
    name: 'email',
    autoFocus: true
  }
]
