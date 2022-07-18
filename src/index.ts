import * as constants from './constants'
export {constants}
const {STATIC_ADDRESSES, COLLECTION_ADDRESS_PREFIX} = constants

import type {ethers as _Ethers, Signer} from 'ethers'
type Ethers = typeof _Ethers
type SignerOrProvider = Signer | _Ethers.providers.Provider

import type {
  CollectionHelpers,
  ContractHelpers,
  UniqueNFT,
  UniqueFungible,
} from '../factory/ethers'

export type {
  CollectionHelpers,
  ContractHelpers,
  UniqueNFT,
  UniqueFungible,
}

const getEthers = async (ethers?: Ethers): Promise<Ethers> => {
  if (ethers) return ethers
  return (await import('ethers')).ethers
}

export const collectionIdToLowercaseAddress = (collectionId: number) => {
  if (isNaN(collectionId)) throw new Error(`Passed number is NaN: ${collectionId}`)
  if (collectionId < 0) throw new Error(`Passed number is less than 0: ${collectionId}`)
  if (collectionId > 0xFFFFFFFF) throw new Error(`Passed number is more than 2**32: ${collectionId}`)

  return COLLECTION_ADDRESS_PREFIX + collectionId.toString(16).padStart(8, '0')
}

const collectionIdOrAddressToAddress = (collectionIdOrAddress: number | string): string => {
  return typeof collectionIdOrAddress === 'string'
    ? collectionIdOrAddress
    : collectionIdToLowercaseAddress(collectionIdOrAddress);
}



export const CollectionHelpersFactory = async (signerOrProvider: SignerOrProvider, ethers?: Ethers) => {
  const ethersLib = await getEthers(ethers)

  return new ethersLib.Contract(
    STATIC_ADDRESSES.collectionHelpers,
    (await import('../abi/CollectionHelpers.json')).default,
    signerOrProvider
  ) as CollectionHelpers
}

export const ContractHelpersFactory = async (signerOrProvider: SignerOrProvider, ethers?: Ethers) => {
  const ethersLib = await getEthers(ethers)

  return new ethersLib.Contract(
    STATIC_ADDRESSES.contractHelpers,
    (await import('../abi/ContractHelpers.json')).default,
    signerOrProvider
  ) as ContractHelpers
}

export const UniqueNFTFactory = async (collectionIdOrAddress: number | string, signerOrProvider: SignerOrProvider, ethers?: Ethers) => {
  const ethersLib = await getEthers(ethers)

  return new ethersLib.Contract(
    collectionIdOrAddressToAddress(collectionIdOrAddress),
    (await import('../abi/UniqueNFT.json')).default,
    signerOrProvider
  ) as UniqueNFT
}

export const UniqueFungibleFactory = async (collectionIdOrAddress: number | string, signerOrProvider: SignerOrProvider, ethers?: Ethers) => {
  const ethersLib = await getEthers(ethers)

  return new ethersLib.Contract(
    collectionIdOrAddressToAddress(collectionIdOrAddress),
    (await import('../abi/UniqueFungible.json')).default,
    signerOrProvider
  ) as UniqueFungible
}
