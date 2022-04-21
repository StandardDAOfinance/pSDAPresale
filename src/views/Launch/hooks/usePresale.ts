import { useCallback } from 'react'
import { getCurrentPrice, getUserStatus } from 'utils/calls'
import { usePresaleContract} from 'hooks/useContract'

const usePresale = () => {
  const presaleContract = usePresaleContract()

  const handleGetPrice = useCallback(
    async () => {
      const res = await getCurrentPrice(presaleContract)
      return res;
    },
    [presaleContract]
  )

  const handleGetUserStatus = useCallback(
    async (account:string) => {
      const res = await getUserStatus(presaleContract, account)
      console.log("[GD], handleGetUserStatus.res=", res)
      return res;
    },
    [presaleContract]
  )

  return {
      onGetPrice: handleGetPrice,
      onGetUserStatus : handleGetUserStatus
  }
}

export default usePresale
