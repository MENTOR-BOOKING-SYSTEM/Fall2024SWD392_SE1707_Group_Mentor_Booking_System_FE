import { UserInfo } from '@/models/user.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserInfo = {
  email: '',
  firstName: '',
  lastName: '',
  avatarUrl: null,
  groupID: null,
  projectID: null,
  position: null
}

const CurrentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserInfo>) {
      state = action.payload
    }
  }
})

export const { setCurrentUser } = CurrentUserSlice.actions
export default CurrentUserSlice.reducer
