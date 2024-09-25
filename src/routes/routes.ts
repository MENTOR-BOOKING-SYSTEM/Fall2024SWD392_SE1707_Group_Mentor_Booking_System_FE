export const PUBLIC_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register'
}

export const PRIVATE_ROUTES = {
  ROOT: '/',
  ME: '/me',
  CURRENT_PROJECT: '/:projectId',
  TIMELINE: '/:projectId/timeline',
  BOARDS: '/:projectId/boards',
  CALENDAR: '/:projectId/calendar',
  BACKLOG: '/:projectId/backlog',
  MEMBERS: '/:projectId/members'
}
