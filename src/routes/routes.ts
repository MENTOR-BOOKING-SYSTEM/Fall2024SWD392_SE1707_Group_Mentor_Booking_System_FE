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
    path: '/:projectID/timeline',
    bcLabel: 'Timeline'
  },
  BOARDS: {
    path: '/:projectID/boards',
    bcLabel: 'Boards'
  },
  CALENDAR: {
    path: '/:projectID/calendar',
    bcLabel: 'Calendar'
  },
  BACKLOG: {
    path: '/:projectID/backlog',
    bcLabel: 'Backlog'
  },
  MEMBERS: {
    path: '/:projectID/members',
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
  ACCOUNTS: {
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
    path: '/review/:projectID',
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
  PROJECT_DETAIL: {
    path: '/:projectID/detail',
    bcLabel: 'Project detail'
  }
}
