import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  successfulCreation: boolean
  successfulFirstFactor: boolean
}

const initialState: AuthState = {
  successfulCreation: false,
  successfulFirstFactor: false
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSuccessfulCreation: (state, action: PayloadAction<boolean>) => {
      state.successfulCreation = action.payload
    },
    setSuccessfulFirstFactor: (state, action: PayloadAction<boolean>) => {
      state.successfulFirstFactor = action.payload
    }
  }
})

export const { setSuccessfulCreation, setSuccessfulFirstFactor } = AuthSlice.actions
export default AuthSlice.reducer
