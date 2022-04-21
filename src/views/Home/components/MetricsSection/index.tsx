import React from 'react'
import styled from 'styled-components'
import { Heading, Flex, Text, Skeleton, ChartIcon, CommunityIcon, SwapIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber } from 'utils/formatBalance'
import ConnectWalletButton from 'components/ConnectWalletButton'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'
import GradientLogo from '../GradientLogoSvg'

const ContentWrapper = styled(Flex)`
  flex-direction: column;
  min-height: 140px;
  align-items: center;
  justify-content: center;
`

const ValueWrapper = styled(Flex)`
  flex-direction: column;
  min-height: 140px;
  align-items: center;
  justify-content: space-between;
`

const ValueArea = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  text-align: start;
`

const ValueItemArea = styled(Flex)`
  flex-direction: column;
  width: 50%;
  margin-bottom: 10px;
`

const ValueTitle = styled(Text)`
  color: ${({theme}) => theme.colors.primary};
  font-size: 13px;
  font-weight: bold;
`

const Value = styled(Text)`
  color: ${({theme}) => theme.colors.text};
  font-size: 20px;
`

// Values fetched from bitQuery effective 6/9/21
const txCount = 30841921
const addressCount = 2751624

const Stats = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const { theme } = useTheme()

  const tvlString = data ? formatLocalisedCompactNumber(data.tvl) : '-'
  const trades = formatLocalisedCompactNumber(txCount)
  const users = formatLocalisedCompactNumber(addressCount)

  const tvlText = t('And those users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlString })
  const [entrusting, inFunds] = tvlText.split(tvlString)

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Flex flexDirection={['column', null, null, 'row']} justifyContent="space-between" width="100%">
        <IconCard>
          <ValueWrapper>
            <ValueArea mb="20px">
              <ValueItemArea>
                <ValueTitle>{t('CHEESE to Harvest')}</ValueTitle>
                <Value>{t('Locked')}</Value>
              </ValueItemArea>
              <ValueItemArea>
                <ValueTitle>{t('CHEESE to Wallet')}</ValueTitle>
                <Value>{t('Locked')}</Value>
              </ValueItemArea>
            </ValueArea>
            <ConnectWalletButton width="100%" />
          </ValueWrapper>
        </IconCard>
        <IconCard>
          <ValueWrapper>
            <ValueArea mb="20px">
              <ValueItemArea>
                <ValueTitle>{t('CHEESE Price')}</ValueTitle>
                <Value>{t('$0')}</Value>
              </ValueItemArea>
              <ValueItemArea>
                <ValueTitle>{t('CHEESE Market Cap')}</ValueTitle>
                <Value>{t('$0')}</Value>
              </ValueItemArea>
            </ValueArea>
            <ValueArea>
              <ValueItemArea>
                <ValueTitle>{t('CHEESE in Circulation')}</ValueTitle>
                <Value>{t('$0')}</Value>
              </ValueItemArea>
              <ValueItemArea>
                <ValueTitle>{t('CHEESE Burned')}</ValueTitle>
                <Value>{t('$0')}</Value>
              </ValueItemArea>
            </ValueArea>
          </ValueWrapper>
        </IconCard>
        <IconCard>
          <ContentWrapper>
            <Text fontSize="46px">{t('$2.3K')}</Text>
            <Text color="primary" bold>{t('Total Value Locked (TVL)')}</Text>
          </ContentWrapper>
        </IconCard>
      </Flex>
    </Flex>
  )
}

export default Stats
