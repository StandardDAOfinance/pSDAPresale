import { MenuItemsType, DropdownMenuItemType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Exchange'),
    icon: 'Swap',
    href: '/swap',
    hideSubNav: true,
    showItemsOnMobile: false,
    items: [],
  },
  {
    label: t('Liquidity'),
    icon: 'Add',
    href: '/liquidity',
    hideSubNav: true,
    showItemsOnMobile: false,
    items: [],
  },
  {
    label: t('Farms'),
    href: '/farms',
    icon: 'Farm',
    items: [],
  },
  {
    label: t('Pools'),
    href: '/pools',
    icon: 'Pool',
    items: [],
  },
  {
    label: t('NFT'),
    href: '/nfts',
    icon: 'NFT',
    items: [],
  },  
  {
    label: t('Launch'),
    href: '/launch',
    icon: 'Launch',
    items: [],
  },
]

export default config
