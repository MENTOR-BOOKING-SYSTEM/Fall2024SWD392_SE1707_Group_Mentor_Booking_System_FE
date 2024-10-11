export const PUBLIC_ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_CODE: '/verify-code',
  RESET_PASSWORD: '/reset-password'
}

export const PRIVATE_ROUTES = {
  ROOT: '/',
  ME: '/me',
  CURRENT_PROJECT: '/:projectId',
  TIMELINE: '/:projectId/timeline',
  BOARDS: '/:projectId/boards',
  CALENDAR: '/:projectId/calendar',
  BACKLOG: '/:projectId/backlog',
  MEMBERS: '/:projectId/members',
  LIST_POSTS: '/list-post'
}
