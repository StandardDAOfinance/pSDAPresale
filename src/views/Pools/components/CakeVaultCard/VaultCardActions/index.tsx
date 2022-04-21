import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Box } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { DeserializedPool } from 'state/types'
import { BIG_ZERO } from 'utils/bigNumber'
import VaultApprovalAction from './VaultApprovalAction'
import VaultStakeActions from './VaultStakeActions'
import { useCheckVaultApprovalStatus } from '../../../hooks/useApprove'

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

const CakeVaultCardActions: React.FC<{
  pool: DeserializedPool
  accountHasSharesStaked: boolean
  isLoading: boolean
  performanceFee: number
}> = ({ pool, accountHasSharesStaked, isLoading, performanceFee }) => {
  const { stakingToken, userData } = pool
  const { t } = useTranslation()
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  const { isVaultApproved, setLastUpdated } = useCheckVaultApprovalStatus()

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <StyledFlex>
          <Box display="inline" mb="10px">
            <InlineText color="text" textTransform="uppercase" bold fontSize="14px">
              {accountHasSharesStaked ? stakingToken.symbol : t('Stake')}{' '}
            </InlineText>
            <InlineText color="text" textTransform="uppercase" bold fontSize="14px">
              {accountHasSharesStaked ? t('Staked (compounding)') : `${stakingToken.symbol}`}
            </InlineText>
          </Box>
          {isVaultApproved ? (
            <VaultStakeActions
              isLoading={isLoading}
              pool={pool}
              stakingTokenBalance={stakingTokenBalance}
              accountHasSharesStaked={accountHasSharesStaked}
              performanceFee={performanceFee}
            />
          ) : (
            <VaultApprovalAction isLoading={isLoading} setLastUpdated={setLastUpdated} />
          )}

        </StyledFlex>
      </Flex>
    </Flex>
  )
}

export default CakeVaultCardActions
