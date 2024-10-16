import { useGetAllSemesters } from '@/features/semester/get-all-semester/use-get-all-semester'
import SemesterTable from '@/features/semester/semester-table'
import { ISemester } from '@/features/semester/type'
import { useEffect, useState } from 'react'

export default function Semesters() {
  const { data } = useGetAllSemesters()
  const [semesters, setSemesters] = useState<ISemester[]>([])

  useEffect(() => {
    if (data) {
      const formattedData: ISemester[] = data.map((item: any) => ({
        semesterID: item.semesterID,
        semesterName: item.semesterName,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description || null
      }))
      setSemesters(formattedData)
    }
  }, [data])

  return <SemesterTable semesters={semesters} />
}
