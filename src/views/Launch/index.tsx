import React from 'react'
import styled from 'styled-components'
import { Heading, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { launchConfig } from 'config/constants'
// import { useLaunch } from 'state/launch/hooks'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import Introduction from './components/Introduction'
import Calculator from './components/Calculator'
import PresaleCard from './components/PresaleCard'
import { Steps } from './config'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  margin-top: 20px;
  margin-bottom: 20px;

  ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: 1fr;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 1fr 1fr;
  }
`

const StyledIcon = styled.img`
  min-width: 120px;
  height: 120px;
  margin: 10px;
  background: #ffffff19;
  padding: 15px;
  border-radius: 26px;
  box-shadow: 2px -2px 4px 1px #ffffff80;
`

const StyledStepArea = styled(Flex)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  grid-gap: 30px 100px;
`

const Launch: React.FC = () => {
  const { t } = useTranslation()
  // const { launch } = useLaunch()

  const getUTCTime = (timestamp) => {
    const date = new Date(timestamp * 1000)    
    return date.toUTCString().toLocaleString()
  }

  return (
    <>
      <Page>
        <Wrapper>
          <Introduction />
          <PresaleCard launch={launchConfig} />
        </Wrapper>
        {/* <Flex flexDirection="column" mt="100px">
          <Heading as="h1" scale="xl" color="text" m="0 auto" mb="24px">{t('Calculator')}</Heading>
          <Calculator />
        </Flex> */}
        <Flex flexDirection="column" mt="100px">
          <Heading as="h1" scale="xl" color="text" m="0 auto" mb="24px">{t('How it works')}</Heading>
          <StyledStepArea>
          {Steps.map((step, index) => {
            return (
              <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <StyledIcon src={`/images/${step.icon}.svg`} alt={step.icon} />
                <Text fontSize="24px">{`Step ${index + 1}`}</Text>
                <Text fontSize="24px" textAlign="center">{step.description}</Text>
              </Flex>
            )
          })}
          </StyledStepArea>
        </Flex>
      </Page>
    </>
  )
}

export default Launch
