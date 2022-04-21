import { launchConfig } from 'config/constants'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import erc20 from 'config/abi/erc20.json'
import presale from 'config/abi/presale.json'

export const fetchBalance = async () => {
  const calls = [
    {
      address: tokens.wbnb.address,
      name: 'balanceOf',
      params: [launchConfig.presaleAddress],
    },
  ]

  const [callData] = await multicall(erc20, calls)

  return callData.balance.toNumber()
}

export const fetchClaimTotalSupply = async () => {
  const calls = [
    {
      address: launchConfig.presaleAddress,
      name: 'stepSupply3'
    }
  ]
  const [stepSupply3] = await multicall(presale, calls)

  return stepSupply3[0]
}

export const fetchClaimedSupply = async () => {
  const calls = [
    {
      address: launchConfig.presaleAddress,
      name: 'claimedSupply'
    }
  ]
  const [claimedSupply] = await multicall(presale, calls)

  return claimedSupply[0]
}

export const fetchMinContribution = async () => {
  const calls = [
    {
      address: launchConfig.presaleAddress,
      name: 'minContribution'
    }
  ]
  const [minContribution] = await multicall(presale, calls)

  return minContribution[0]
}

export const fetchMaxContribution = async () => {
  const calls = [
    {
      address: launchConfig.presaleAddress,
      name: 'maxContribution'
    }
  ]
  const [maxContribution] = await multicall(presale, calls)

  return maxContribution[0]
}

export const fetchContribution = async (account) => {
  const calls = [
    {
      address: launchConfig.presaleAddress,
      name: 'getUserContribution',
      params: [account]
    },
  ]

  const [contributions] = await multicall(presale, calls)
  
  return contributions[0].toNumber()
}