import { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

const pools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokens.cake,
    earningToken: serializedTokens.cake,
    contractAddress: {
      4: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      1: '0x3a08D7C4D2C25cd22b8f2A0aB3b2c6841d5d42Ad',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '40',
    sortOrder: 1,
    isFinished: false,
  },
  // {
  //   sousId: 1,
  //   stakingToken: serializedTokens.hamster,
  //   earningToken: serializedTokens.cake,
  //   contractAddress: {
  //     97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
  //     56: '0x3a08D7C4D2C25cd22b8f2A0aB3b2c6841d5d42Ad',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '40',
  //   sortOrder: 2,
  //   isFinished: false,
  // },
]

export default pools
