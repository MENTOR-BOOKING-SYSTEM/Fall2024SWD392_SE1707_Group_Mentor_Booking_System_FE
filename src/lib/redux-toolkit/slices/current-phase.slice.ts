import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CurrentPhaseState {
  currentPhase: string
}

const initialState: CurrentPhaseState = { currentPhase: '' }

const CurrentPhaseSlice = createSlice({
  name: 'currentPhase',
  initialState,
  reducers: {
    setPhase: (state, action: PayloadAction<string>) => {
      state.currentPhase = action.payload
    }
  }
})

export const { setPhase } = CurrentPhaseSlice.actions
export default CurrentPhaseSlice.reducer
