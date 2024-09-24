import AppLayout from '@/layouts/app.layout'
import AuthLayout from '@/layouts/auth.layout'
import GuardLayout from '@/layouts/guard.layout'
import DefaultLayout from '@/layouts/default.layout'

import Home from '@/pages/home'

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
            element: <div>Login</div>
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
                path: PRIVATE_ROUTES.HOME,
                element: <Home />
              },
              {
                path: PRIVATE_ROUTES.ME,
                element: <div>Me</div>
              }
            ]
          }
        ]
      }
    ]
  }
])
