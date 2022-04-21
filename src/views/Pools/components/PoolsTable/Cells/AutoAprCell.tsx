import React from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { DeserializedPool } from 'state/types'
import { useCakeVault } from 'state/pools/hooks'
import { useTranslation } from 'contexts/Localization'
import BaseCell, { CellContent } from './BaseCell'
import Apr from '../Apr'
import { convertSharesToCake } from '../../../helpers'

interface AprCellProps {
  pool: DeserializedPool
}

const StyledCell = styled(BaseCell)`
  flex: 1 0 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
  }
`

const Layout = styled(CellContent)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`

const AutoAprCell: React.FC<AprCellProps> = ({ pool }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const {
    userData: { userShares },
    fees: { performanceFee },
    pricePerFullShare,
  } = useCakeVault()

  const { cakeAsBigNumber } = convertSharesToCake(userShares, pricePerFullShare)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  return (
    <StyledCell role="cell">
      <Layout>
        <Apr
          pool={pool}
          stakedBalance={cakeAsBigNumber}
          performanceFee={performanceFeeAsDecimal}
          showIcon={!isMobile}
        />        
        <Text fontSize="12px" color="textSubtle" textAlign="left" mt="10px">
          {t('APY')}
        </Text>
      </Layout>
    </StyledCell>
  )
}

export default AutoAprCell
