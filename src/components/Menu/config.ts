import { MenuEntry } from '@igniswap/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://igniswap.github.io/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
  {
    label: 'Staking',
    icon: 'PoolIcon',
    href: 'https://flama.app',
  },
  /*
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: 'https://pancakeswap.finance/lottery',
  },
  {
    label: 'NFT',
    icon: 'NftIcon',
    href: 'https://pancakeswap.finance/nft',
  },
  {
    label: 'Teams & Profile',
    icon: 'GroupsIcon',
    calloutClass: 'rainbow',
    items: [
      {
        label: 'Leaderboard',
        href: 'https://pancakeswap.finance/teams',
      },
      {
        label: 'Task Center',
        href: 'https://pancakeswap.finance/profile/tasks',
      },
      {
        label: 'Your Profile',
        href: 'https://pancakeswap.finance/profile',
      },
    ],
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://pancakeswap.info',
      },
      {
        label: 'Tokens',
        href: 'https://pancakeswap.info/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://pancakeswap.info/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://pancakeswap.info/accounts',
      },
    ],
  },
  {
    label: 'IFO',
    icon: 'IfoIcon',
    href: 'https://pancakeswap.finance/ifo',
  },
  */
  {
    label: 'FLAMA',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Buy FMA',
        href: 'https://uniswap.exchange/swap?outputCurrency=0x0f8794f66c7170c4f9163a8498371a747114f6c4',
      },
      {
        label: 'Etherscan - FLAMA',
        href: 'https://etherscan.io/token/0x0f8794f66c7170c4f9163a8498371a747114f6c4',
      },
      {
        label: 'CoinMarketCap - FLAMA',
        href: 'https://coinmarketcap.com/currencies/flama/',
      },
      {
        label: 'CoinGecko - FLAMA',
        href: 'https://www.coingecko.com/en/coins/flama/',
      },
    ],
  },
  {
    label: 'FLAPP',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Buy FLAP',
        href: 'https://julswap.com/#/swap?outputCurrency=0x5c6a58d670483e1211b131f0a6501849c77a77d5',
      },
      {
        label: 'Etherscan - FLAPP',
        href: 'https://etherscan.io/token/0xCfb72ED3647cC8E7FA52E4F121eCdAbEfC305e7f',
      },
      {
        label: 'BSCscan - FLAPP',
        href: 'https://etherscan.io/token/0xCfb72ED3647cC8E7FA52E4F121eCdAbEfC305e7f',
      },
      {
        label: 'CoinGecko - FLAPP',
        href: 'https://www.coingecko.com/en/coins/flapp/',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/flamatoken/',
      },
      {
        label: 'Blog',
        href: 'https://flamateam.medium.com',
      },
    ],
  },
]

export default config
