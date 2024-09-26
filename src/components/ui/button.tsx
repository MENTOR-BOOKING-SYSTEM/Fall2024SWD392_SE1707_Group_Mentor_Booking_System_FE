import { type ButtonProps as NextButtonProps, Button as NextButton } from '@nextui-org/button'

interface ButtonProps extends NextButtonProps {
  children: React.ReactNode
}

export default function Button(props: ButtonProps) {
  return (
    <NextButton {...props}>
      <div className='font-bold'>{props.children}</div>
    </NextButton>
  )
}
