import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { formatEther, parseUnits } from 'ethers/lib/utils'
import { ethers } from 'ethers'
import { Card, CardBody, Text, Heading, BaseLayout, Button, LinkExternal, Progress, Flex, Image, useModal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Launch, LaunchStatus } from 'config/constants/types'
import { usePresaleContract } from 'hooks/useContract'
import { useFetchLaunch, useLaunch } from 'state/launch/hooks'
import { getBscScanLink } from 'utils'
import truncateHash from 'utils/truncateHash'
import { getAddress } from 'utils/addressHelpers'
import ConnectWalletButton from 'components/ConnectWalletButton'
// import LaunchTime from './LaunchTime'
import useContribute from '../../hooks/useContribute'
import useClaim from '../../hooks/useClaim'
import useRefund from '../../hooks/useRefund'
import usePresale from '../../hooks/usePresale'
import ContributeModal from './ContributeModal'


const PresaleCardWrapper = styled(Card)`
  width: 100%;
  margin: 0 auto;
  padding: 32px 0;
  border: 1px solid #ffffff;
  max-width: 420px;
`

const TokenImage = styled.img`
  margin-right: 20px;
`

const StyledProgress = styled(Progress)`
  margin-top: 20px;
  width: 100%;
`

const ExternalLink = styled(LinkExternal)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: normal;
  font-size: 20px;

  svg {
    fill: ${({ theme }) => theme.colors.text};
  }
`

const StyledBox = styled(Flex)`
  flex-direction: column;
  width: 100%;
  border-radius: 35px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  padding: 15px;
  margin-top: 20px;
`

const StyledButton = styled(Button)`
  background: linear-gradient(103.91deg, #6CBDC3 1.61%, rgba(134, 157, 185, 0.927155) 33.89%, rgba(16, 87, 89, 0.8) 100%);
  border-radius: 16px;
`

export interface PresaleCardProps {
  launch: Launch
}

const getValueAsEthersBn = (amount: string) => {
  const valueAsFloat = parseFloat(amount)
  return Number.isNaN(valueAsFloat) ? ethers.BigNumber.from(0) : parseUnits(amount)
}

const getStatus = (currentTime: number, startTime: number, endTime: number): LaunchStatus | null => {
  if (currentTime < startTime) {
    return 'coming_soon'
  }

  if (currentTime >= startTime && currentTime <= endTime) {
    return 'live'
  }

  if (currentTime > endTime) {
    return 'finished'
  }

  return null
}

const PresaleCard: React.FC<PresaleCardProps> = ({launch}) => {
  const { t } = useTranslation()
  const { account, library } = useWeb3React()
  const {id, address, isActive, symbol, name, currency, presaleAddress, tokenDecimals, maxContribution, minContribution, soft, hard} = launch
  const presaleContract = usePresaleContract()
  const { onContribute } = useContribute()
  const { onGetPrice, onGetUserStatus } = usePresale()
  const { onClaim } = useClaim()
  const { onRefund } = useRefund()
  const { launch: launchData } = useLaunch()
  const [loading, setLoading] = useState(true)
  const [softCapReached, setSoftCapReached] = useState(false)
  const [status, setStatus] = useState(0)
  const [progress, setProgress] = useState(0)
  const [contribution, setContribution] = useState("0")
  const [tokenContribution, setTokenContribution] = useState(0)
  const [claimedAmount, setClaimedAmount] = useState(0)
  const [price, setPrice] = useState("0")

  // useFetchLaunch(account)

  useEffect(() => {
    const currentTime = Math.round(Date.now() / 1000)
    setStatus(launchData.claimedSupply / launchData.claimTotalSupply * 100)
    // setProgress(launchData.claimedSupply / launchData.claimTotalSupply * 100)
    setProgress(launchData.contribution / launchData.maxContribution)
    setLoading(false)
  }, [launchData, launch])

  useEffect(() => {
    const loadInfo = async() => {
      const res = await onGetPrice()
      console.log("[GD],getPrice=", res)
      setPrice(res)
      if(account) {
        const statusRes = await onGetUserStatus(account)
        console.log("[GD],getUserStatus=",statusRes)
        console.log("[GD], daiAmount", formatEther(statusRes._daiAmount))
        if(statusRes.length === 4) {
          setContribution(formatEther(statusRes._daiAmount))
          setTokenContribution(statusRes._depositAmount);
          setClaimedAmount(statusRes._claimedAmount)
        }
      }
    }
    loadInfo()
  }, [onGetPrice, onGetUserStatus, account])

  const isFinished = status

  const handleContribute = async (amount: string) => {
    await onContribute(amount)
  }

  const handleClaim = async () => {
    await onClaim()
  }

  const handleRefund = async () => {
    await onRefund()
  }

  const [onContributeModal] = useModal(
    <ContributeModal
      onConfirm={handleContribute}
      tokenName="DAI"
    />,
  )

  const renderActionButton = () => {
    return isFinished ? (
      (
        softCapReached ?
          <StyledButton onClick={handleClaim} mt="10px" width="200px">
            {t('Claim')}
          </StyledButton>
          :
          <StyledButton onClick={handleRefund} mt="10px" width="200px">
            {t('Refund')}
          </StyledButton>
      )
    ) : (
      <StyledButton onClick={onContributeModal} mt="10px" width="200px">
        {t('Contribute')}
      </StyledButton>
    )
  }

  return (
    <PresaleCardWrapper>
      <CardBody>
        <Flex alignItems="center" mb="20px">
          <Heading scale="xl">{t(`pSDA`)}</Heading>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" mt="30px">
          <Text fontSize="20px">{t('Name')}</Text>
          <Text fontSize="20px">{name}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="20px">{t('Symbol')}</Text>
          <Text fontSize="20px">{symbol}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="20px">{t('Decimals')}</Text>
          <Text fontSize="20px">{tokenDecimals}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="20px">{t('Token Address')}</Text>
          <ExternalLink href={getBscScanLink(getAddress(address), 'address')}>{truncateHash(getAddress(address))}</ExternalLink>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="20px">{t('Presale Price')}</Text>
          <Text fontSize="20px">{t(`${price}$`)}</Text>
        </Flex>
        <StyledBox>          
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="20px">{t('Min Contribution')}</Text>
            <Text fontSize="20px">{t(`${minContribution} DAI`)}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" mb="10px">
            <Text fontSize="20px">{t('Max Contribution')}</Text>
            <Text fontSize="20px">{t(`${maxContribution} DAI`)}</Text>
          </Flex>
          <StyledProgress primaryStep={progress} secondaryStep={progress + 20} />
          <Flex alignItems="center" justifyContent="space-between" mt="10px">
            <Text fontSize="20px">{t('Your DAI Contribution')}</Text>
            <Text fontSize="20px">{t(`${contribution} DAI`)}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="20px">{t('Your Token Contribution')}</Text>
            <Text fontSize="20px">{t(`${tokenContribution} PSDA`)}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="20px">{t('Claimed Amount')}</Text>
            <Text fontSize="20px">{t(`${claimedAmount} PSDA`)}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center" mt="10px">
            {renderActionButton()}
          </Flex>
        </StyledBox>
      </CardBody>
    </PresaleCardWrapper>
  )
}

export default PresaleCard