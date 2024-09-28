import LoginFormProvider from '@/features/auth/login/login-form.provider'
import AppLayout from '@/layouts/app.layout'
import AuthLayout from '@/layouts/auth.layout'
import DefaultLayout from '@/layouts/default.layout'
import GuardLayout from '@/layouts/guard.layout'
import Backlog from '@/pages/backlog'
import Redirect from '@/pages/redirect'

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
            path: PUBLIC_ROUTES.REGISTER,
            element: <div>Register</div>
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
