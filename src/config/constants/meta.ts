import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'PSDAPresale',
  description:
    'The most popular AMM on BSC by user count! Earn CHEESE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PSDAPresale), NFTs, and more, on a platform you can trust.',
  image: 'https://PSDAPresale.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('PSDAPresale')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('PSDAPresale')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('PSDAPresale')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('PSDAPresale')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('PSDAPresale')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('PSDAPresale')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('PSDAPresale')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('PSDAPresale')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('PSDAPresale')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('PSDAPresale')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('PSDAPresale')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('PSDAPresale')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('PSDAPresale')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('PSDAPresale')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('PSDAPresale')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('PSDAPresale')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('PSDAPresale')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('PSDAPresale')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('PSDAPresale Info & Analytics')}`,
        description: 'View statistics for PSDAPresale exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('PSDAPresale Info & Analytics')}`,
        description: 'View statistics for PSDAPresale exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('PSDAPresale Info & Analytics')}`,
        description: 'View statistics for PSDAPresale exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('PSDAPresale')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('PSDAPresale')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('PSDAPresale')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('PSDAPresale')}`,
      }
    default:
      return null
  }
}
