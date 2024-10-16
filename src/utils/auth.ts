export const getAuthFromLS = () => JSON.parse(localStorage.getItem('auth') || '{}')
