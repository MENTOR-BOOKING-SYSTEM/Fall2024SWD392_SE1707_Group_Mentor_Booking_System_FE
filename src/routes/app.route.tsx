import ForgotPwdFormProvider from '@/features/auth/forgot-pwd/forgot-pwd-form.provider'
import LoginFormProvider from '@/features/auth/login/login-form.provider'
import ResetPwdFormProvider from '@/features/auth/reset-pwd/reset-pwd-form.provider'
import VerifyCode from '@/features/auth/verify-code/verify-code'
import AppLayout from '@/layouts/app.layout'
import AuthLayout from '@/layouts/auth.layout'
import DefaultLayout from '@/layouts/default.layout'
import GuardLayout from '@/layouts/guard.layout'
import NonSidebarLayout from '@/layouts/non-sidebar.layout'
import PhaseLayout from '@/layouts/phase.layout'
import PrepareLayout from '@/layouts/prepare.layout'
import RoleLayout from '@/layouts/role.layout'
import Backlog from '@/pages/backlog'
import NotFound from '@/pages/not-found'
import ProjectSubmission from '@/pages/project-submission'
import AuthRedirect from '@/pages/redirect/auth-redirect'
import Redirect from '@/pages/redirect/redirect'
import Submission from '@/pages/submission'

import { PHASES, ROLES } from '@/constants'
import { createBrowserRouter } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes'

export const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/*',
        element: <NotFound />
      },
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
          },
          {
            path: PUBLIC_ROUTES.AUTH,
            element: <AuthRedirect />
          }
        ]
      },
      {
        // guarded routes
        element: <GuardLayout />,
        children: [
          {
            path: PRIVATE_ROUTES.ROOT.path,
            element: <Redirect />
          },
          {
            element: <RoleLayout allowRoles={[ROLES.ADMIN]} />,
            children: [
              {
                path: PRIVATE_ROUTES.DASHBOARD.path,
                element: <div>Dashboard</div>
              }
            ]
          },
          {
            element: <RoleLayout allowRoles={[ROLES.STUDENT, ROLES.MENTOR, ROLES.BUSINESS]} />,
            children: [
              {
                element: <PrepareLayout />,
                children: [
                  {
                    path: PRIVATE_ROUTES.PREPARE.path,
                    element: (
                      <PhaseLayout
                        allowPhases={[
                          PHASES.BS_W6_1,
                          PHASES.BS_W5_1,
                          PHASES.BS_W3_2,
                          PHASES.BS_W3_1,
                          PHASES.BS_W2_2,
                          PHASES.BS_W2_W1_1
                        ]}
                      >
                        <div>Prepare</div>
                      </PhaseLayout>
                    )
                  },
                  {
                    path: PRIVATE_ROUTES.SUBMISSION.path,
                    element: (
                      <PhaseLayout allowPhases={[PHASES.BS_W5_1, PHASES.BS_W3_2]}>
                        <Submission />
                      </PhaseLayout>
                    )
                  },
                  {
                    path: PRIVATE_ROUTES.CHOOSE_PROJECT.path,
                    element: (
                      <PhaseLayout allowPhases={[PHASES.BS_W2_W1_1]}>
                        <div>Choose Project</div>
                      </PhaseLayout>
                    )
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
          },
          {
            element: (
              <PhaseLayout
                allowPhases={[
                  PHASES.IS,
                  PHASES.IS_E2W_1,
                  PHASES.IS_E2W_2,
                  PHASES.IS_E2W_3,
                  PHASES.IS_E2W_4,
                  PHASES.IS_E2W_5
                ]}
              />
            ),
            children: [
              {
                element: <RoleLayout allowRoles={[ROLES.STUDENT, ROLES.MENTOR, ROLES.BUSINESS]} />,
                children: [
                  {
                    element: <DefaultLayout />,
                    children: [
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
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
])
