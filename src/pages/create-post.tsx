import { Input, Textarea, Button, Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useState, ChangeEvent, FormEvent } from 'react'

interface FormData {
  name: string
  description: string
  technology: string
}

interface FormErrors {
  name: string
  description: string
  technology: string
}

function CreatePost() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    technology: ''
  })

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    description: '',
    technology: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: ''
    })
  }

  const handleTechnologyChange = (key: string | null) => {
    if (typeof key === 'string') {
      setFormData({
        ...formData,
        technology: key
      })
      setErrors({
        ...errors,
        technology: ''
      })
    }
  }

  const technology = [
    { label: 'Java', value: 'JavaID' },
    { label: 'C', value: 'CID' },
    { label: 'Python', value: 'PythonID' },
    { label: 'C#', value: 'C#ID' }
  ]

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = {
      name: '',
      description: '',
      technology: ''
    }

    if (!formData.name) {
      validationErrors.name = 'Title is required'
    }
    if (!formData.description) {
      validationErrors.description = 'Description is required'
    }
    if (!formData.technology) {
      validationErrors.technology = 'Technology selection is required'
    }

    setErrors(validationErrors)
    if (!validationErrors.name && !validationErrors.description && !validationErrors.technology) {
      console.log(formData)
    }
  }

  return (
    <div className='CreatePost' style={{ padding: '50px' }}>
      <h1 className='CreatePost_title' style={{ fontSize: '30px', fontWeight: '600', marginBottom: '30px' }}>
        Create post recruitment
      </h1>
      <form onSubmit={handleSubmit}>
        <div
          className='CreatePost_form'
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            paddingBottom: '50px',
            borderBottom: '1px solid #333'
          }}
        >
          <div>
            <span style={{ color: 'red' }}>*</span>
            <Input
              style={{ fontSize: '30px' }}
              placeholder='Enter your title...'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className='error' style={{ color: 'red' }}>
                {errors.name}
              </span>
            )}
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '5px' }}>
              Description <span style={{ color: 'red', fontSize: '14px' }}>*</span>
            </h3>
            <Textarea
              variant='bordered'
              placeholder='Enter your description...'
              name='description'
              value={formData.description}
              onChange={handleChange}
              classNames={{
                input: 'resize-y min-h-[40px]'
              }}
            />
            {errors.description && (
              <span className='error' style={{ color: 'red' }}>
                {errors.description}
              </span>
            )}
          </div>
          <div>
            <span style={{ color: 'red' }}>*</span>
            <br />
            <Autocomplete
              defaultItems={technology}
              label='Select technology'
              placeholder='Search a technology'
              initialValue={formData.technology}
              onSelectionChange={handleTechnologyChange}
              className='max-w-xs'
            >
              {(technology) => <AutocompleteItem key={technology.value}>{technology.label}</AutocompleteItem>}
            </Autocomplete>
            <br />
            {errors.technology && (
              <span className='error' style={{ color: 'red' }}>
                {errors.technology}
              </span>
            )}
          </div>
        </div>
        <div className='CreatePost_Button' style={{ marginTop: '30px', display: 'flex', gap: '30px' }}>
          <Button
            color='default'
            type='button'
            onClick={() => setFormData({ name: '', description: '', technology: '' })}
          >
            Reset
          </Button>
          <Button color='primary' type='submit'>
            Post
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
