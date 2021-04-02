import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair } from '@igniswap/sdk'
import { Button, CardBody, Text } from '@igniswap/uikit'
import { Link } from 'react-router-dom'
import CardNav from 'components/CardNav'
import Question from 'components/QuestionHelper'
import FullPositionCard from 'components/FlapFarmCard'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { StyledInternalLink } from 'components/Shared'
import { LightCard } from 'components/Card'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'

import { useActiveWeb3React } from 'hooks'
import { usePairs } from 'data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { Dots } from 'components/swap/styleds'
import TranslatedText from 'components/TranslatedText'
import { TranslateString } from 'utils/translateTextHelpers'
import PageHeader from 'components/PageHeader'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import AppBody from '../AppBody'

const StatusDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const StatusBold = styled.label`
  font-size: 20px;
  font-weight: 600;
`;

const StatusSubDiv = styled.label`
  display: flex;
  margin-bottom: 1rem;
  flex-flow: row;
  grid-gap: 1rem;
  align-items: center;
`;

const StatusNormal = styled.label`
  font-size: 14px;
  color: #555;
`;

export default function Farm() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens,
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  return (
    <>
      <CardNav activeIndex={2} />
      <AppBody>
        <PageHeader title="Farm" description="Farm FLAP/BNB IGNI-LP to receive FLAP rewards">
          <StatusDiv>
            {
              allV2PairsWithLiquidity.length > 0 ?
                <DoubleCurrencyLogo currency0={unwrappedToken(allV2PairsWithLiquidity[0].token0)} currency1={unwrappedToken(allV2PairsWithLiquidity[0].token1)} size={50} /> :
                null
            }
            <StatusBold>APR: 200.00%</StatusBold>
            <StatusBold>Available: 0.0000</StatusBold>
            <StatusSubDiv>
              <StatusNormal>Staked: 0.0000</StatusNormal>
              <StatusNormal>0.00$ FLAP/BNB</StatusNormal>
            </StatusSubDiv>
          </StatusDiv>
          <Button id="join-pool-button" as={Link} to="/farm/FLAP">
            <TranslatedText translationId={100}>Add Liquidity with BNB</TranslatedText>
          </Button>
        </PageHeader>
        <AutoColumn gap="lg" justify="center">
          <CardBody style={{ width: '100%', padding: '1rem 2rem' }}>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0 8px">
                <Text color={theme.colors.text}>
                  <TranslatedText translationId={102}>Your Liquidity</TranslatedText>
                </Text>
                <Question
                  text={TranslateString(
                    130,
                    'When you add liquidity, you are given IGNI-LP pool tokens that represent your share in the FLAP/BNB pair.'
                  )}
                />
              </RowBetween>

              {!account ? (
                <LightCard padding="40px">
                  <Text color="textDisabled" textAlign="center">
                    Connect to a wallet to view your liquidity.
                  </Text>
                </LightCard>
              ) : v2IsLoading ? (
                <LightCard padding="40px">
                  <Text color="textDisabled" textAlign="center">
                    <Dots>Loading</Dots>
                  </Text>
                </LightCard>
              ) : allV2PairsWithLiquidity?.length > 0 ? (
                <>
                  {allV2PairsWithLiquidity.map((v2Pair) => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                </>
              ) : (
                <LightCard padding="40px">
                  <Text color="textDisabled" textAlign="center">
                    <TranslatedText translationId={104}>No liquidity found.</TranslatedText>
                  </Text>
                </LightCard>
              )}
            </AutoColumn>
          </CardBody>
        </AutoColumn>
      </AppBody>
    </>
  )
}
