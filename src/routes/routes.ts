import { Route } from '@/models/base.model'

export const PUBLIC_ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_CODE: '/verify-code',
  RESET_PASSWORD: '/reset-password',
  AUTH: '/auth'
}

export const PRIVATE_ROUTES: Route = {
  ROOT: {
    path: '/',
    bcLabel: 'Home'
  },
  ME: {
    path: '/me',
    bcLabel: 'Me'
  },
  CURRENT_PROJECT: {
    path: '/current-project',
    bcLabel: 'My project'
  },
  TIMELINE: {
    path: '/:projectId/timeline',
    bcLabel: 'Timeline'
  },
  BOARDS: {
    path: '/:projectId/boards',
    bcLabel: 'Boards'
  },
  CALENDAR: {
    path: '/:projectId/calendar',
    bcLabel: 'Calendar'
  },
  BACKLOG: {
    path: '/:projectId/backlog',
    bcLabel: 'Backlog'
  },
  MEMBERS: {
    path: '/:projectId/members',
    bcLabel: 'Members'
  },
  SUBMIT_PROJECT: {
    path: '/submit-project',
    bcLabel: 'Submit project'
  },
  SEMESTERS: {
    path: '/semesters',
    bcLabel: 'semesters'
  },
  },
  CREATE_SEMESTERS: {
    path: '/create-semesters',
    bcLabel: 'Create semesters'
  },
  DASHBOARD: {
    path: '/dashboard',
    bcLabel: 'Dashboard'
  },
  PREPARE: {
    path: '/prepare',
    bcLabel: 'Prepare'
  },
  SUBMISSION: {
    path: '/submission',
    bcLabel: 'Submission'
  },
  CHOOSE_PROJECT: {
    path: '/choose-project',
    bcLabel: 'Choose project'
  },
  GROUP: {
    path: '/group',
    bcLabel: 'Group'
  },
  ACCOUNT: {
    path: '/accounts',
    bcLabel: 'Accounts'
  }
}
