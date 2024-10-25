import AssignReviewers from '@/features/users/mentors/assign-reviewers/assign-reviewers'
import GetAllReviewers from '@/features/users/mentors/get-all-reviewers/get-all-reviewers'
import { Tab, Tabs } from '@nextui-org/react'

export default function Reviewers() {
  return (
    <div>
      <Tabs aria-label='Options' color='primary'>
        <Tab key='reviewers' title='Reviewers'>
          <GetAllReviewers />
        </Tab>
        <Tab key='assign-reviewers' title='Assign Reviewers'>
          <AssignReviewers />
        </Tab>
      </Tabs>
    </div>
  )
}
