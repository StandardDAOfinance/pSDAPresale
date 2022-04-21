import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, CardFooter, ExpandableLabel, HelpIcon, useTooltip } from '@pancakeswap/uikit'
import { DeserializedPool } from 'state/types'
import { CompoundingPoolTag, ManualPoolTag } from 'components/Tags'

interface FooterProps {
  pool: DeserializedPool
  account: string
  totalCakeInVault?: BigNumber
  action?: () => void
  isExpanded?: boolean;
}

const ExpandableButtonWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
  button {
    padding: 0;
  }
`

const Footer: React.FC<FooterProps> = ({ pool, account, action, isExpanded }) => {
  const { isAutoVault } = pool
  const { t } = useTranslation()

  const manualTooltipText = t('You must harvest and compound your earnings from this pool manually.')
  const autoTooltipText = t(
    'Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.',
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(isAutoVault ? autoTooltipText : manualTooltipText, {
    placement: 'bottom',
  })

  return (
    <CardFooter>
      <ExpandableButtonWrapper>
        <ExpandableLabel expanded={isExpanded} onClick={action}>
          {isExpanded ? t('Hide') : t('Details')}
        </ExpandableLabel>
      </ExpandableButtonWrapper>
    </CardFooter>
  )
}

export default Footer
