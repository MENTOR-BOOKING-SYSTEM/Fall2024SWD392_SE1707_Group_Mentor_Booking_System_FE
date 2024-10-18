export const getStatus = (type: string) => {
  switch (type) {
    case '1':
      return 'Optional'
    default:
      return 'Required'
  }
}

export const getColor = (status: string): 'primary' | 'danger' | 'success' => {
  switch (status) {
    case 'Optional':
      return 'primary'
    case 'Required':
      return 'danger'
    default:
      return 'success'
  }
}
