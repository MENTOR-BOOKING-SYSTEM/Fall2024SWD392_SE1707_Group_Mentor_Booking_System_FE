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
  },
  APPROVAL_CRITERIAS: {
    path: '/approval-criterias',
    bcLabel: 'Approval criterias'
  },
  REVIEWERS: {
    path: '/reviewers',
    bcLabel: 'Reviewers'
  },
  REVIEW: {
    path: '/review',
    bcLabel: 'Review'
  },
  REVIEW_PROJECT: {
    path: '/review/:projectId',
    bcLabel: 'Review project'
  },
  POSTS: {
    path: '/posts',
    bcLabel: 'Posts'
  },
  TIMESTAMPS: {
    path: '/timestamps',
    bcLabel: 'Timestamps'
  },
  CREATE_GROUP: {
    path: '/create-group',
    bcLabel: 'Create group'
  }
}
