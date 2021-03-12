import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Heading, IconButton, Text, Flex, useModal, CogIcon, Svg } from '@pancakeswap-libs/uikit'
import SettingsModal from './SettingsModal'
import RecentTransactionsModal from './RecentTransactionsModal'

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}

const HistoryIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24">
    <path fill="#ea4c4c" d="M9.7 39.7c1.6 2.5 2.7 4.3 3.9 5.9 1 1.3 2.3 2.6 3.7 3.4 4.7 2.9 8.6.8 8.7-4.7.1-5.9-.4-11.7-.2-17.6.2-8.5 2-16.5 6.9-23.7.6-.9 1.3-1.6 2.4-3-2 13.6 4.6 23.2 11.7 32.7 4.2 5.6 8.6 11.2 12.1 17.2 11.1 19.3-1 40.7-19 45.3C17.7 100.9-.4 83.8 0 64.2c.1-8.1 2.6-15.3 7.5-21.7.7-.9 1.3-1.7 2.2-2.8z"></path>
  </Svg>
)

const StyledPageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`

const Details = styled.div`
  flex: 1;
`

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  const [onPresentSettings] = useModal(<SettingsModal />)
  const [onPresentRecentTransactions] = useModal(<RecentTransactionsModal />)

  return (
    <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <Heading mb="8px">{title}</Heading>
          {description && (
            <Text color="textSubtle" fontSize="14px">
              {description}
            </Text>
          )}
        </Details>
        <IconButton variant="text" onClick={onPresentSettings} title="Settings">
          <CogIcon width="24px" color="currentColor" />
        </IconButton>
        <IconButton variant="text" onClick={onPresentRecentTransactions} title="Recent transactions">
          <HistoryIcon />
        </IconButton>
      </Flex>
      {children && <Text mt="16px">{children}</Text>}
    </StyledPageHeader>
  )
}

export default PageHeader
