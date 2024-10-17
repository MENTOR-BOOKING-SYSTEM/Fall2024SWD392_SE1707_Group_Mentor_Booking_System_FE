export const getStatus = (startDate: string | number | Date, endDate: string | number | Date): string => {
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (now < start) {
    return 'Upcoming'
  } else if (now > end) {
    return 'Finished'
  } else {
    return 'Current'
  }
}

export const getColor = (status: string): 'primary' | 'warning' | 'success' => {
  switch (status) {
    case 'Current':
      return 'success'
    case 'Finished':
      return 'warning'
    case 'Upcoming':
      return 'primary'
    default:
      return 'primary'
  }
}
