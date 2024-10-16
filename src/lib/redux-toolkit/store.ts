import currentPhaseSlice from './slices/current-phase.slice'
import currentUserSlice from './slices/current-user.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    currentPhase: currentPhaseSlice,
    currentUser: currentUserSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
