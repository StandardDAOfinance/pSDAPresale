import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'
import { ethers } from 'ethers'
import { parseEther, formatEther } from "@ethersproject/units";
import { DEFAULT_GAS_LIMIT } from 'config'
import getGasPrice from 'utils/getGasPrice'
import { getSigner } from 'utils'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const contributePresale = async (presaleContract, amount) => {
  const gasPrice = getGasPrice()
  console.log("[GD], contributePresale.amount=",amount);
  console.log("[GD], contributePresale.parseEther(amount)=", parseEther(amount));
  const tx = await presaleContract.buypSDA(parseEther(amount))
  console.log("[GD], contributePresale.tx = ", tx)
  const receipt = await tx.wait()
  return receipt
}

export const claimPresale = async (presaleContract) => {
  const gasPrice = getGasPrice()
  const tx = await presaleContract.claimTokens({ ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt
}

export const refundPresale = async (presaleContract) => {
  const gasPrice = getGasPrice()
  const tx = await presaleContract.refund({ ...options, gasPrice })
  const receipt = await tx.wait()
}

export const approve = async (tokenContract, recipient, amount ) => {
  const gasPrice = getGasPrice()
  const tx = await tokenContract.approve(recipient, parseEther(amount))
  const receipt = await tx.wait()
  return receipt
}

export const getCurrentPrice = async(presaleContract) => {
  const res = await presaleContract.getCurrentPrice()
  return formatEther(res)
}

export const getUserStatus = async(presaleContract, account) => {
  const res = await presaleContract.getUserStatus(account)
  return res
}