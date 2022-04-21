import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'

const IntroductionWrapper = styled(Card)`
  margin: 0 auto;
  padding: 32px 0;
`
const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 40px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

const StyledConnectWalletButton = styled(ConnectWalletButton)`
  width: 100%;
  margin-top: 20px;
  background: linear-gradient(103.91deg, #C4A4CC 1.61%, rgba(134, 157, 185, 0.927155) 31.84%, rgba(108, 189, 195, 0.8) 100%);
`


const Introduction: React.FC = () => {
  const { t } = useTranslation()

  return (
    <IntroductionWrapper>
      <CardBody>
        <div>
          <Heading as="h1" scale="xxl" color="text" mb="24px">{t('Standard DAO Token Presale')}</Heading>
          <Text fontSize="24px">{t('Welcome to the presale! Please connect your wallet to participate. Instructions on how to participate are below.')}</Text>
          <StyledConnectWalletButton />
        </div>
      </CardBody>
    </IntroductionWrapper>
  )
}

export default Introduction