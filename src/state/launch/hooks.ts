import { useEffect } from 'react'
import { useAppDispatch } from 'state'
import { useSelector } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { State, LaunchState } from '../types'
import { fetchLaunchDataAsync } from '.'

export const useFetchLaunch = (account) => {
  const { fastRefresh, slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchLaunchDataAsync(account))
  }, [dispatch, slowRefresh, account])
}

export const useLaunch = (): { launch: LaunchState } => {
  const { claimTotalSupply, claimedSupply, contribution, minContribution, maxContribution} = useSelector((state: State) => ({
    claimTotalSupply: state.launch.claimTotalSupply,
    claimedSupply: state.launch.claimedSupply,
    minContribution: state.launch.minContribution,
    maxContribution: state.launch.maxContribution,
    contribution: state.launch.contribution,
  }))
  const launch = {
    claimTotalSupply,
    claimedSupply,
    minContribution,
    maxContribution,
    contribution,
  }
  return { launch }
}