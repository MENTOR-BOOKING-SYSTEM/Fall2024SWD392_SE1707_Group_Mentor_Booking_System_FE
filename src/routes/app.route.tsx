import ForgotPwdFormProvider from '@/features/auth/forgot-pwd/forgot-pwd-form.provider'
import LoginFormProvider from '@/features/auth/login/login-form.provider'
import ResetPwdFormProvider from '@/features/auth/reset-pwd/reset-pwd-form.provider'
import AppLayout from '@/layouts/app.layout'
import AuthLayout from '@/layouts/auth.layout'
import DefaultLayout from '@/layouts/default.layout'
import GuardLayout from '@/layouts/guard.layout'
import Backlog from '@/pages/backlog'
import Redirect from '@/pages/redirect'
import VerifyCode from '@/features/auth/verify-code/verify-code'
import NonSidebarLayout from '@/layouts/non-sidebar.layout'
import ProjectSubmission from '@/pages/project-submission'

import { createBrowserRouter } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes'

export const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        // non-guarded routes
        element: <AuthLayout />,
        children: [
          {
            path: PUBLIC_ROUTES.LOGIN,
            element: <LoginFormProvider />
          },
          {
            path: PUBLIC_ROUTES.FORGOT_PASSWORD,
            element: <ForgotPwdFormProvider />
          },
          {
            path: PUBLIC_ROUTES.VERIFY_CODE,
            element: <VerifyCode />
          },
          {
            path: PUBLIC_ROUTES.RESET_PASSWORD,
            element: <ResetPwdFormProvider />
          }
        ]
      },
      {
        // guarded routes
        element: <GuardLayout />,
        children: [
          {
            element: <DefaultLayout />,
            children: [
              {
                path: PRIVATE_ROUTES.ROOT.path,
                element: <Redirect />
              },
              {
                path: PRIVATE_ROUTES.CURRENT_PROJECT.path,
                element: <div>Current Project</div>
              },
              {
                path: PRIVATE_ROUTES.ME.path,
                element: <div>Me</div>
              },
              {
                path: PRIVATE_ROUTES.TIMELINE.path,
                element: <div>Timeline</div>
              },
              {
                path: PRIVATE_ROUTES.BOARDS.path,
                element: <div>Boards</div>
              },
              {
                path: PRIVATE_ROUTES.CALENDAR.path,
                element: <div>Calendar</div>
              },
              {
                path: PRIVATE_ROUTES.BACKLOG.path,
                element: <Backlog />
              },
              {
                path: PRIVATE_ROUTES.MEMBERS.path,
                element: <div>Members</div>
              }
            ]
          },
          {
            element: <NonSidebarLayout />,
            children: [
              {
                path: PRIVATE_ROUTES.SUBMIT_PROJECT.path,
                element: <ProjectSubmission />
              }
            ]
          }
        ]
      }
    ]
  }
])
