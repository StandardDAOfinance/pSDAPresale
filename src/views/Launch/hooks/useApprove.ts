import { useCallback } from 'react'
import { approve } from 'utils/calls'
import { useTokenContract } from 'hooks/useContract'
import { getMDAIAddress, getPresaleAddress } from 'utils/addressHelpers'

const useApprove = () => {
  const tokenContract = useTokenContract(getMDAIAddress())

  const handleApprove = useCallback(
    async (amount: string) => {
      const txHash = await approve(tokenContract, getPresaleAddress() , amount)
      console.info(txHash)
    },
    [tokenContract],
  )

  return { onApprove: handleApprove }
}

export default useApprove
