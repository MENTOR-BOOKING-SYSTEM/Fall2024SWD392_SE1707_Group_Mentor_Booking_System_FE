// Semesters.tsx
import React, { useState } from 'react'
import SemesterTable from '@/features/semester/semester-table'
import SemesterModal from '@/features/semester/semester-modal'

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('/')
  return `${day}/${month}/${year}`
}

interface Semester {
  id: number
  key: string
  semester: string
  startDate: string
  endDate: string
  desc: string
}

const rows: Semester[] = [
  {
    id: 1,
    key: '1',
    semester: 'Spring2024',
    startDate: '2024/01/01',
    endDate: '2024/04/15',
    desc: 'Test semester'
  },
  {
    id: 2,
    key: '2',
    semester: 'Summer2024',
    startDate: '2024/05/01',
    endDate: '2024/08/31',
    desc: 'Test semester'
  },
  {
    id: 3,
    key: '3',
    semester: 'Spring2025',
    startDate: '2025/01/01',
    endDate: '2025/04/15',
    desc: 'Test semester'
  }
]

const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'semester',
    label: 'SEMESTER'
  },
  {
    key: 'startDate',
    label: 'START DATE'
  },
  {
    key: 'endDate',
    label: 'END DATE'
  },
  {
    key: 'desc',
    label: 'DESCRIPTION'
  },
  {
    key: 'action',
    label: 'ACTIONS'
  }
]

export default function Semesters() {
  const [selectedItem, setSelectedItem] = useState<Semester | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleOpen = (item: Semester, editMode: boolean) => {
    setSelectedItem(item)
    setIsEditMode(editMode)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedItem(null)
    setIsEditMode(false)
  }

  const handleSave = () => {
    console.log('Saved', selectedItem)
    setIsOpen(false)
  }

  const handleInputChange = (key: keyof Semester, value: string) => {
    if (selectedItem) {
      setSelectedItem({
        ...selectedItem,
        [key]: value
      })
    }
  }

  return (
    <div>
      <SemesterTable
        rows={rows}
        columns={columns}
        handleOpen={handleOpen}
        formatDate={formatDate}
        calculateStatus={() => 'Current'} // Dummy calculateStatus function
      />

      <SemesterModal
        isOpen={isOpen}
        isEditMode={isEditMode}
        selectedItem={selectedItem}
        handleClose={handleClose}
        handleSave={handleSave}
        handleInputChange={handleInputChange}
        formatDate={formatDate}
      />
    </div>
  )
}
