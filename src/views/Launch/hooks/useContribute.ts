import { useCallback } from 'react'
import { contributePresale, approve } from 'utils/calls'
import { usePresaleContract, useTokenContract } from 'hooks/useContract'
import { getMDAIAddress, getPresaleAddress } from 'utils/addressHelpers'

const useContribute = () => {
  const presaleContract = usePresaleContract()
  const tokenContract = useTokenContract(getMDAIAddress())

  const handleContribute = useCallback(
    async (amount: string) => {
      let txHash = await approve(tokenContract, getPresaleAddress() , amount);
      txHash = await contributePresale(presaleContract, amount)
    },
    [tokenContract, presaleContract],
  )

  return { onContribute: handleContribute }
}

export default useContribute
