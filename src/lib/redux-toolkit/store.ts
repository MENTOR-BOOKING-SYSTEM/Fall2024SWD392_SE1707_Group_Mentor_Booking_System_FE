import currentStepSlice from './slices/current-step.slice'
import authSlice from './slices/auth.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    currentStep: currentStepSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
