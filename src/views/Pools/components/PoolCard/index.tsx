import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CardBody, Flex, Text, CardRibbon, Skeleton } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { DeserializedPool } from 'state/types'
import { useCakeVault } from 'state/pools/hooks'
import Balance from 'components/Balance'
import AprRow from './AprRow'
import { StyledCard } from './StyledCard'
import CardFooter from './CardFooter'
import ExpandedData from './ExpandedData'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'

const StyledFlex = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  padding: 15px;
`

const ValueArea = styled(Flex)`
  width: 90%;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  margin-right: 10px;
  padding: 3px 10px;
`

const PoolCard: React.FC<{ pool: DeserializedPool; account: string }> = ({ pool, account }) => {
  const { sousId, stakingToken, earningToken, isFinished, userData, totalStaked, isAutoVault } = pool
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const { totalCakeInVault } = useCakeVault()
  const isManualCakePool = sousId === 0

  const getTotalStakedBalance = () => {
    if (isAutoVault) {
      return getBalanceNumber(totalCakeInVault, stakingToken.decimals)
    }
    if (isManualCakePool) {
      return getBalanceNumber(totalStaked, stakingToken.decimals)
    }
    return getBalanceNumber(totalStaked, stakingToken.decimals)
  }

  return (
    <StyledCard
      isFinished={isFinished && sousId !== 0}
      ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
    >
      <StyledCardHeader
        isStaking={accountHasStakedBalance}
        earningToken={earningToken}
        stakingToken={stakingToken}
        isFinished={isFinished && sousId !== 0}
      />
      <CardBody>
        <Flex mb="10px">
          <AprRow pool={pool} stakedBalance={stakedBalance} />
          <Flex alignItems="left" flexDirection="column" width="50%">
            <Text>{t('Total staked')}</Text>
              {totalStaked ? (
                <ValueArea>
                  <Balance value={getTotalStakedBalance()} decimals={0} />
                </ValueArea>
              ) : (
                <Skeleton width="82px" height="32px" />
              )}
          </Flex>
        </Flex>
        { isExpanded && <ExpandedData pool={pool} account={account}/> }
        <Flex mt="24px" flexDirection="column">
          {account ? (
            <CardActions pool={pool} stakedBalance={stakedBalance} />
          ) : (
            <StyledFlex>
              <Text mb="10px" textTransform="uppercase" fontSize="14px" color="text" bold>
                {t('Start earning')}
              </Text>
              <ConnectWalletButton variant="secondary" />
            </StyledFlex>
          )}
        </Flex>
      </CardBody>
      <CardFooter pool={pool} account={account} action={() => setIsExpanded(!isExpanded)} isExpanded={isExpanded} />
    </StyledCard>
  )
}

export default PoolCard
