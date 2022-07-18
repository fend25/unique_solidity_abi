import type {providers} from "ethers";
import {Address, StringUtils} from '@unique-nft/api/dist/address'

export const getNFTCollection = async(provider: providers.JsonRpcProvider | providers.Web3Provider, collectionIdOrAddress: number | string) => {
  const collectionId = typeof collectionIdOrAddress === 'number'
    ? collectionIdOrAddress
    : Address.collection.addressToId(collectionIdOrAddress)

  const collection = await provider.send(
    "unique_collectionById",
    [collectionId]
  )
  collection.name = StringUtils.vec2str(collection.name)
  collection.description = StringUtils.vec2str(collection.description)
  collection.token_prefix = StringUtils.vec2str(collection.token_prefix)
  collection.token_property_permissions = collection.token_property_permissions.map(({key, permission}: any) => ({key: StringUtils.vec2str(key), permission}))
  collection.properties = collection.properties.map(({key, value}: any) => ({key: StringUtils.vec2str(key), value: StringUtils.vec2str(value)}))


  return collection
}

export const getNFTToken = async(provider: providers.JsonRpcProvider | providers.Web3Provider,
                                 collectionIdOrAddress: number | string,
                                 tokenId: number,
) => {
  const collectionId = typeof collectionIdOrAddress === 'number'
    ? collectionIdOrAddress
    : Address.collection.addressToId(collectionIdOrAddress)

  const token = await provider.send(
    "unique_tokenData",
    [collectionId, tokenId]
  )

  return token
}
