import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text, Flex, Input } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'

const CalculatorWrapper = styled(Card)`
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


const Calculator: React.FC = () => {
  const { t } = useTranslation()

  return (
    <CalculatorWrapper>
      <CardBody>
        <Flex mb="20px">
          <Text fontSize="20px" width="200px">{t('You will put')}</Text>
          <Input width="150px"/>
          <Text fontSize="20px" width="100px" textAlign="right">{t('DAI')}</Text>
        </Flex>
        <Flex>
          <Text fontSize="20px" width="200px">{t('You will receive')}</Text>
          <Input width="150px"/>
          <Text fontSize="20px" width="100px" textAlign="right">{t('pSDA')}</Text>
        </Flex>
      </CardBody>
    </CalculatorWrapper>
  )
}

export default Calculator