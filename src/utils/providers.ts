import { ethers } from 'ethers'
import getRpcUrl from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl()
console.log("[GD], RPC_URL:", RPC_URL)
export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)

export default null
