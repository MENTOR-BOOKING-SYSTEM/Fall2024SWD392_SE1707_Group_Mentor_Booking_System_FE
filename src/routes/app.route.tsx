import AppLayout from '@/layouts/app.layout'
import AuthLayout from '@/layouts/auth.layout'
import GuardLayout from '@/layouts/guard.layout'
import DefaultLayout from '@/layouts/default.layout'
import Redirect from '@/pages/redirect'
import Backlog from '@/pages/backlog'
import LoginFormProvider from '@/features/auth/login/login-form.provider'
import ForgotPasswordStep from '@/pages/forgot-password-step'

import { createBrowserRouter } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes'
import ForgotPasswordFormProvider from '@/features/auth/forgot-password/forgot-password-form.provider'

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
            path: PUBLIC_ROUTES.REGISTER,
            element: <div>Register</div>
          },
          {
            path: PUBLIC_ROUTES.FORGOT_PASSWORD,
            element: <ForgotPasswordFormProvider />
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
                path: PRIVATE_ROUTES.ROOT,
                element: <Redirect />
              },
              {
                path: PRIVATE_ROUTES.CURRENT_PROJECT,
                element: <div>Current Project</div>
              },
              {
                path: PRIVATE_ROUTES.ME,
                element: <div>Me</div>
              },
              {
                path: PRIVATE_ROUTES.TIMELINE,
                element: <div>Timeline</div>
              },
              {
                path: PRIVATE_ROUTES.BOARDS,
                element: <div>Boards</div>
              },
              {
                path: PRIVATE_ROUTES.CALENDAR,
                element: <div>Calendar</div>
              },
              {
                path: PRIVATE_ROUTES.BACKLOG,
                element: <Backlog />
              },
              {
                path: PRIVATE_ROUTES.MEMBERS,
                element: <div>Members</div>
              }
            ]
          }
        ]
      }
    ]
  }
])
