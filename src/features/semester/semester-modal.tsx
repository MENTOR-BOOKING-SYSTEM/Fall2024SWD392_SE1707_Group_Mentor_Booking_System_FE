// SemesterModal.tsx
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'

interface Semester {
  id: number
  semester: string
  startDate: string
  endDate: string
  desc: string
}

interface SemesterModalProps {
  isOpen: boolean
  isEditMode: boolean
  selectedItem: Semester | null
  handleClose: () => void
  handleSave: () => void
  handleInputChange: (key: keyof Semester, value: string) => void
  formatDate: (dateString: string) => string
}

const SemesterModal: React.FC<SemesterModalProps> = ({
  isOpen,
  isEditMode,
  selectedItem,
  handleClose,
  handleSave,
  handleInputChange,
  formatDate
}) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>{isEditMode ? 'Edit Semester' : 'Semester Details'}</ModalHeader>
        <ModalBody>
          {selectedItem && (
            <>
              <p>
                <strong>Semester:</strong>{' '}
                {isEditMode ? (
                  <Input
                    value={selectedItem.semester}
                    onChange={(e) => handleInputChange('semester', e.target.value)}
                  />
                ) : (
                  selectedItem.semester
                )}
              </p>
              <p>
                <strong>Start Date:</strong>{' '}
                {isEditMode ? (
                  <Input
                    value={selectedItem.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                ) : (
                  formatDate(selectedItem.startDate)
                )}
              </p>
              <p>
                <strong>End Date:</strong>{' '}
                {isEditMode ? (
                  <Input value={selectedItem.endDate} onChange={(e) => handleInputChange('endDate', e.target.value)} />
                ) : (
                  formatDate(selectedItem.endDate)
                )}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {isEditMode ? (
                  <Input value={selectedItem.desc} onChange={(e) => handleInputChange('desc', e.target.value)} />
                ) : (
                  selectedItem.desc
                )}
              </p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={handleClose}>
            Close
          </Button>

          {isEditMode && (
            <Button color='primary' onPress={handleSave}>
              Save
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SemesterModal
