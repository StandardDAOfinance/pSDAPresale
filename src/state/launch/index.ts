import { createSlice } from '@reduxjs/toolkit'
import { LaunchState, AppThunk } from 'state/types'
import { fetchBalance, fetchClaimTotalSupply, fetchClaimedSupply, fetchContribution, fetchMinContribution, fetchMaxContribution } from './fetchLaunch'

const initialState: LaunchState = {
  claimTotalSupply: 0,
  claimedSupply: 0,
  minContribution: 0,
  maxContribution: 0,
  contribution: 0
}

export const fetchLaunchDataAsync = (account): AppThunk => async (dispatch) => {
  const launchData = {
    claimTotalSupply: await fetchClaimTotalSupply(),
    claimedSupply: await fetchClaimedSupply(),
    minContribution: await fetchMinContribution(),
    maxContribution: await fetchMaxContribution(),
    contribution: account ? await fetchContribution(account) : 0
  }

  dispatch(setLaunchData(launchData))
}

export const LaunchSlice = createSlice({
  name: 'Launch',
  initialState,
  reducers: {
    setLaunchData: (state, action) => {
      const launchData = action.payload
      if (!state.claimTotalSupply) {
        state.claimTotalSupply = launchData.claimTotalSupply
      }
      if (!state.claimedSupply) {
        state.claimedSupply = launchData.claimedSupply
      }
      state.contribution = launchData.contribution
    },
  },
})

// Actions
export const { setLaunchData } = LaunchSlice.actions

export default LaunchSlice.reducer