interface ShouldRenderProps {
  condition: boolean | undefined
  fallback: React.ReactNode
  children: React.ReactNode
}

export default function ShouldRender({ condition, fallback, children }: ShouldRenderProps) {
  return condition ? <>{children}</> : <>{fallback}</>
}
