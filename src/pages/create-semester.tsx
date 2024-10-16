import { useState, useEffect } from 'react'
import { Button, useDisclosure } from '@nextui-org/react'
import { DateValue } from '@react-types/datepicker'
import { CalendarDate } from '@internationalized/date'
import SemesterModal from '@/features/semester/create-semester/semester-modal'
import { useCreateSemester } from '@/features/semester/get-all-semester/use-get-all-semester'

const CreateSemesters: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [semesterName, setSemesterName] = useState('')
  const [startDate, setStartDate] = useState<DateValue | null>(null)
  const [endDate, setEndDate] = useState<DateValue | null>(null)
  const [description, setDescription] = useState<string | null>('')

  const createSemesterMutation = useCreateSemester()

  useEffect(() => {
    if (startDate) {
      const newEndDate = new CalendarDate(startDate.year, startDate.month, startDate.day).add({ weeks: 16 })
      setEndDate(newEndDate)
    }
  }, [startDate])

  const handleCreate = () => {
    if (!semesterName) {
      alert('Need Semester Name')
      return
    }

    if (startDate && endDate) {
      const semesterData = {
        semesterName,
        startDate: startDate.toDate('UTC').toISOString(),
        endDate: endDate.toDate('UTC').toISOString(),
        description: description || null
      }

      createSemesterMutation.mutate(semesterData, {
        onSuccess: () => {
          console.log('Semester Create Success!')
          onOpenChange()
          setSemesterName('')
          setStartDate(null)
          setEndDate(null)
          setDescription('')
        },
        onError: (error) => {
          console.error('Create error:', error)
          alert('Can not create semester')
        }
      })
    } else {
      alert('Must have start date and end date')
    }
  }

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Add Semester
      </Button>
      <SemesterModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        semesterName={semesterName}
        setSemesterName={setSemesterName}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        description={description}
        setDescription={setDescription}
        handleCreate={handleCreate}
      />
    </>
  )
}

export default CreateSemesters
