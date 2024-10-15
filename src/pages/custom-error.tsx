interface CustomErrorPageProps {
  title: string
}

export default function CustomErrorPage({ title }: CustomErrorPageProps) {
  return <p className='text-3xl text-danger'>{title}</p>
}
