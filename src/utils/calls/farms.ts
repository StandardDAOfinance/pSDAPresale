import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount, decimals) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString()
  const decimalsValue = new BigNumber(amount).toString()
  if (pid === 0) {
    const tx = await masterChefContract.enterStaking(value, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  if (pid === 3) {
    const tx = await masterChefContract.deposit(pid, decimalsValue, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  if (pid === 4) {
    const depositAmount = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
    const tx = await masterChefContract.deposit(pid, depositAmount, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, value, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (masterChefContract, pid, amount, decimals) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString()
  const decimalsValue = new BigNumber(amount).toString()

  if (pid === 0) {
    const tx = await masterChefContract.leaveStaking(value, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  if (pid === 3) {
    const tx = await masterChefContract.withdraw(pid, decimalsValue, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  if (pid === 4) {
    const withdrawAmount = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
    const tx = await masterChefContract.withdraw(pid, withdrawAmount, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.withdraw(pid, value, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (masterChefContract, pid) => {
  const gasPrice = getGasPrice()
  if (pid === 0) {
    const tx = await masterChefContract.leaveStaking('0', { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, '0', { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}
