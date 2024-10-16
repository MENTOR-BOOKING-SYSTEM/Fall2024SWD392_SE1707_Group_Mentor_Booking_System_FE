// pages/index.tsx
import SemesterTable from '@/features/semester/semester-table'
import { ISemester } from '@/features/semester/type'

const semesters: ISemester[] = [
  {
    semesterID: 1,
    semesterName: 'SPRING2024',
    startDate: '2023-12-31T17:00:00.000Z',
    endDate: '2024-04-21T17:00:00.000Z',
    description: 'This is a very long description for testing purposes.'
  },
  {
    semesterID: 42,
    semesterName: 'SUMMER2024',
    startDate: '2024-04-22T17:00:00.000Z',
    endDate: '2024-08-12T17:00:00.000Z',
    description: 'Short desc'
  },
  {
    semesterID: 43,
    semesterName: 'FALL2024',
    startDate: '2024-08-13T17:00:00.000Z',
    endDate: '2024-12-03T17:00:00.000Z',
    description: null
  }
]

export default function Semesters() {
  return <SemesterTable semesters={semesters} />
}
