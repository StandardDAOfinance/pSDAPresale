import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { BIG_ZERO } from 'utils/bigNumber'
import { Flex, Text, Box } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { PoolCategory } from 'config/constants/types'
import { DeserializedPool } from 'state/types'
import ApprovalAction from './ApprovalAction'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'

const InlineText = styled(Text)`
  display: inline;
`

const StyledFlex = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  padding: 15px;
`

interface CardActionsProps {
  pool: DeserializedPool
  stakedBalance: BigNumber
}

const CardActions: React.FC<CardActionsProps> = ({ pool, stakedBalance }) => {
  const { sousId, stakingToken, earningToken, harvest, poolCategory, userData, earningTokenPrice } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const { t } = useTranslation()
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const needsApproval = !allowance.gt(0) && !isBnbPool
  const isStaked = stakedBalance.gt(0)
  const isLoading = !userData

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {harvest && (
          <StyledFlex mb="15px">
            <Box display="inline">
              <InlineText color="text" textTransform="uppercase" bold fontSize="14px">
                {`${earningToken.symbol} `}
              </InlineText>
              <InlineText color="text" textTransform="uppercase" bold fontSize="14px">
                {t('Earned')}
              </InlineText>
            </Box>
            <HarvestActions
              earnings={earnings}
              earningToken={earningToken}
              sousId={sousId}
              earningTokenPrice={earningTokenPrice}
              isBnbPool={isBnbPool}
              isLoading={isLoading}
            />
          </StyledFlex>
        )}
        <StyledFlex>
          <Box display="inline" mb="10px">
            <InlineText color="text" textTransform="uppercase" bold fontSize="14px">
              {isStaked ? stakingToken.symbol : t('Stake')}{' '}
            </InlineText>
            <InlineText color="text" textTransform="uppercase" bold fontSize="14px">
              {isStaked ? t('Staked') : `${stakingToken.symbol}`}
            </InlineText>
          </Box>
          {needsApproval ? (
            <ApprovalAction pool={pool} isLoading={isLoading} />
          ) : (
            <StakeActions
              isLoading={isLoading}
              pool={pool}
              stakingTokenBalance={stakingTokenBalance}
              stakedBalance={stakedBalance}
              isBnbPool={isBnbPool}
              isStaked={isStaked}
            />
          )}
        </StyledFlex>
      </Flex>
    </Flex>
  )
}

export default CardActions
