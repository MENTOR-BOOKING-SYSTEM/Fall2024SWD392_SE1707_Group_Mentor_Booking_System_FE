import { Accept, FileRejection, useDropzone } from 'react-dropzone'

interface DropzoneProps {
  children?: React.ReactNode
  onDrop: <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => void
  className?: string
  maxFiles?: number
  maxSize?: number
  accept?: Accept | undefined
}

export default function Dropzone({
  children,
  onDrop,
  className,
  maxFiles = 1,
  maxSize = 2097152,
  accept = {
    'image/*': ['.jpg', '.jpeg', '.png', '.gif']
  }
}: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize
  })

  return (
    <div {...getRootProps({ className })}>
      <input {...getInputProps()} />
      {children}
    </div>
  )
}
