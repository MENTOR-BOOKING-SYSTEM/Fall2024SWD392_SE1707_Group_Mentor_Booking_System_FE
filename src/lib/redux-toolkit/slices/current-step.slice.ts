import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CurrentStepKey = 'password' | 'others'

interface CurrentStepPayload {
  key: CurrentStepKey
  step: number
}

interface CurrentStepState {
  [key: string]: {
    currentStep: number
  }
}

const initialState: CurrentStepState = {}

const CurrentStepSlice = createSlice({
  name: 'currentStep',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<CurrentStepPayload>) => {
      const { key, step } = action.payload
      if (!state[key]) {
        state[key] = { currentStep: 1 }
      }
      state[key].currentStep = step
    },
    goToStep: (state, action: PayloadAction<CurrentStepPayload>) => {
      const { key, step } = action.payload
      if (!state[key]) {
        state[key] = { currentStep: 1 }
      }
      state[key].currentStep += step
    }
  }
})

export const { setCurrentStep, goToStep } = CurrentStepSlice.actions
export default CurrentStepSlice.reducer
