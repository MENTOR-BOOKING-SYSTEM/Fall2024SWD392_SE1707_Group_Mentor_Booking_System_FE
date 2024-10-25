import Header from '@/components/shared/header'
import Sidebar from '@/components/shared/sidebar'
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
import RoleLayout from '@/layouts/role.layout'
import Backlog from '@/pages/backlog'
import Criterias from '@/pages/criterias'
import NotFound from '@/pages/not-found'
import ProjectSubmission from '@/pages/projects/project-submission'
import AuthRedirect from '@/pages/redirect/auth-redirect'
import Redirect from '@/pages/redirect/redirect'
import Semesters from '@/pages/semesters'
import Submission from '@/pages/projects/submission'
import DefaultBSLayout from '@/layouts/default-bs.layout'
import Timestamps from '@/pages/timestamps'
import ReviewProject from '@/features/projects/review-project/review-project'
import ProjectReview from '@/pages/projects/project-review'
import ProjectDetail from '@/pages/projects/project-detail'
import Accounts from '@/pages/dashboard/accounts'
import ErrorLayout from '@/layouts/error.layout'

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes'
import { PHASES, ROLES } from '@/constants'
import { ADMIN_SIDEBAR_MENU_ITEMS, IS_SIDEBAR_MENU_ITEMS } from '@/constants/menu-items'
import { createBrowserRouter } from 'react-router-dom'

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
            element: (
              <ErrorLayout>
                <DefaultBSLayout urlPosition={1} />
              </ErrorLayout>
            ),
            children: [
              {
                path: PRIVATE_ROUTES.PROJECT_DETAIL.path,
                element: <ProjectDetail />
              }
            ]
          },
          {
            element: <RoleLayout allowRoles={[ROLES.ADMIN]} />,
            children: [
              {
                element: (
                  <ErrorLayout>
                    <DefaultLayout
                      header={<Header />}
                      sidebar={<Sidebar items={ADMIN_SIDEBAR_MENU_ITEMS} urlPositon={1} />}
                    />
                  </ErrorLayout>
                ),
                children: [
                  {
                    path: PRIVATE_ROUTES.DASHBOARD.path,
                    element: <div>Dashboard</div>
                  },
                  {
                    path: PRIVATE_ROUTES.ACCOUNTS.path,
                    element: <Accounts />
                  },
                  {
                    path: PRIVATE_ROUTES.SEMESTERS.path,
                    element: <Semesters />
                  },
                  {
                    path: PRIVATE_ROUTES.TIMESTAMPS.path,
                    element: <Timestamps />
                  }
                ]
              }
            ]
          },
          {
            element: <RoleLayout allowRoles={[ROLES.MANAGER]} />,
            children: [
              {
                element: (
                  <ErrorLayout>
                    <DefaultBSLayout urlPosition={1} />
                  </ErrorLayout>
                ),
                children: [
                  {
                    path: PRIVATE_ROUTES.REVIEWERS.path,
                    element: <div>Assign reviewers</div>
                  },
                  {
                    path: PRIVATE_ROUTES.APPROVAL_CRITERIAS.path,
                    element: <Criterias />
                  }
                ]
              }
            ]
          },
          {
            element: <RoleLayout allowRoles={[ROLES.STUDENT, ROLES.MENTOR, ROLES.BUSINESS]} />,
            children: [
              {
                element: (
                  <ErrorLayout>
                    <DefaultBSLayout urlPosition={1} />
                  </ErrorLayout>
                ),
                children: [
                  {
                    path: PRIVATE_ROUTES.SUBMISSION.path,
                    element: (
                      <PhaseLayout allowPhases={[PHASES.BS_W5_1, PHASES.BS_W3_2]}>
                        <Submission />
                      </PhaseLayout>
                    )
                  },
                  {
                    path: PRIVATE_ROUTES.GROUP.path,
                    element: <div>Group</div>
                  }
                ]
              },
              {
                element: (
                  <ErrorLayout>
                    <NonSidebarLayout />
                  </ErrorLayout>
                ),
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
            element: <RoleLayout allowRoles={[ROLES.STUDENT]} />,
            children: [
              {
                element: <PhaseLayout allowPhases={[PHASES.BS_W2_W1_1]} />,
                children: [
                  { path: PRIVATE_ROUTES.CHOOSE_PROJECT.path, element: <div>Choose Project</div> },
                  {
                    path: PRIVATE_ROUTES.POSTS.path,
                    element: <div>Posts</div>
                  }
                ]
              }
            ]
          },
          {
            element: <RoleLayout allowRoles={[ROLES.MENTOR]} />,
            children: [
              {
                element: <PhaseLayout allowPhases={[PHASES.BS_W3_1, PHASES.BS_W2_2]} />,
                children: [
                  {
                    element: (
                      <ErrorLayout>
                        <DefaultBSLayout urlPosition={1} />
                      </ErrorLayout>
                    ),
                    children: [
                      {
                        path: PRIVATE_ROUTES.REVIEW.path,
                        element: <ProjectReview />
                      },
                      {
                        path: PRIVATE_ROUTES.REVIEW_PROJECT.path,
                        element: <ReviewProject />
                      }
                    ]
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
                    element: (
                      <ErrorLayout>
                        <DefaultLayout
                          header={<Header />}
                          sidebar={<Sidebar items={IS_SIDEBAR_MENU_ITEMS} urlPositon={2} />}
                        />
                      </ErrorLayout>
                    ),
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
