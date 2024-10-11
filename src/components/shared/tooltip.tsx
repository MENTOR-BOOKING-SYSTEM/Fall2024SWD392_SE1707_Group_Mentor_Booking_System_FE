import { Tooltip as NextTooltip, TooltipProps as NextTooltipProps } from '@nextui-org/react'

interface TooltipProps extends NextTooltipProps {
  content: string
  children: React.ReactNode
}

export default function Tooltip({ content, children, ...props }: TooltipProps) {
  return (
    <NextTooltip content={content} {...props}>
      {children}
    </NextTooltip>
  )
}
