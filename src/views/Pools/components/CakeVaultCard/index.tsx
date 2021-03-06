import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, CardBody, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import tokens from 'config/constants/tokens'
import { useCakeVault } from 'state/pools/hooks'
import { DeserializedPool } from 'state/types'
import { convertSharesToCake } from 'views/Pools/helpers'
import AprRow from '../PoolCard/AprRow'
import { StyledCard } from '../PoolCard/StyledCard'
import CardFooter from '../PoolCard/CardFooter'
import ExpandedData from '../PoolCard/ExpandedData'
import StyledCardHeader from '../PoolCard/StyledCardHeader'
import VaultCardActions from './VaultCardActions'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import RecentCakeProfitRow from './RecentCakeProfitRow'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`

const StyledFlex = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  padding: 15px;
`

interface CakeVaultProps {
  pool: DeserializedPool
  showStakedOnly: boolean
}

const CakeVaultCard: React.FC<CakeVaultProps> = ({ pool, showStakedOnly }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    userData: { userShares, isLoading: isVaultUserDataLoading },
    fees: { performanceFee },
    pricePerFullShare,
  } = useCakeVault()
  const [isExpanded, setIsExpanded] = useState(false)

  const { cakeAsBigNumber } = convertSharesToCake(userShares, pricePerFullShare)

  const accountHasSharesStaked = userShares && userShares.gt(0)
  const isLoading = !pool.userData || isVaultUserDataLoading
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  if (showStakedOnly && !accountHasSharesStaked) {
    return null
  }

  return (
    <StyledCard isActive>
      <StyledCardHeader
        isStaking={accountHasSharesStaked}
        isAutoVault
        earningToken={tokens.cake}
        stakingToken={tokens.cake}
      />
      <StyledCardBody isLoading={isLoading}>
        <AprRow pool={pool} stakedBalance={cakeAsBigNumber} performanceFee={performanceFeeAsDecimal} />
        <Box mt="24px">
          <RecentCakeProfitRow />
        </Box>
        <Box mt="8px" mb="10px">
          <UnstakingFeeCountdownRow />
        </Box>
        { isExpanded && <ExpandedData pool={pool} account={account}/> }
        <Flex mt="32px" flexDirection="column">
          {account ? (
            <VaultCardActions
              pool={pool}
              accountHasSharesStaked={accountHasSharesStaked}
              isLoading={isLoading}
              performanceFee={performanceFeeAsDecimal}
            />
          ) : (
            <StyledFlex>
              <Text mb="10px" textTransform="uppercase" fontSize="14px" color="text" bold>
                {t('Start earning')}
              </Text>
              <ConnectWalletButton variant="secondary" />
            </StyledFlex>
          )}
        </Flex>
      </StyledCardBody>
      <CardFooter pool={pool} account={account} action={() => setIsExpanded(!isExpanded)} isExpanded={isExpanded} />
    </StyledCard>
  )
}

export default CakeVaultCard
