import { useCallback } from 'react'
import { claimPresale } from 'utils/calls'
import { usePresaleContract } from 'hooks/useContract'

const useClaim = () => {
  const presaleContract = usePresaleContract()

  const handleClaim = useCallback(
    async () => {
      const txHash = await claimPresale(presaleContract)
      console.info(txHash)
    },
    [presaleContract],
  )

  return { onClaim: handleClaim }
}

export default useClaim
