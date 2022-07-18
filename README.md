# Unique Solidity interfaces

## Usage

```ts
import {ethers} from 'ethers'
import {
  CollectionHelpersFactory,
  UniqueNFTFactory,
  collectionIdToLowercaseAddress
} from '@unique-nft/solidity'

const provider = new ethers.providers.JsonRpcProvider('https://rpc-opal.unique.network')
const wallet = new ethers.Wallet('<Private key>', provider)

// or, with browser extension:
// const provider = new ethers.providers.Web3Provider(window.ethereum)
// const wallet = provider.getSigner()

const collectionHelpers = await CollectionHelpersFactory(wallet, ethers) // ethers parameter is optional
//when ethers not provided, it's been asynchronously loaded on demand to reduce package size and TTFP

const txCreateCollection = await (await collectionHelpers.createNonfungibleCollection(
  'My Collection', // collection name
  'Fancy collection description', // collection description
  'MYCL' // token prefix - short, up to 4 letters string
)).wait()

const collectionAddress = txCreateCollection.events?.[0].args?.collectionId as string

// just for fun, real collection id as it seen via substrate API
const collectionId = parseInt(collectionAddress.slice(-8), 16) 

const uniqueNFT = await UniqueNFTFactory(collectionAddress, wallet, ethers)

const txMintToken = await (await uniqueNFT.mintWithTokenURI(
  wallet.address,
  uniqueNFT.nextTokenId(),
  'https://ipfs.uniquenetwork.dev/ipfs/QmZ8Syn28bEhZJKYeZCxUTM5Ut74ccKKDbQCqk5AuYsEnp'
)).wait()

// this .toNumber() type casting is safe because tokenId upper boundary is 2**32
const tokenId = txMintToken.events?.[0].args?.tokenId.toNumber()

console.log(`You have successfully created collection ${collectionId} (address ${collectionAddress} and minted token #${tokenId}`)

```

## Exports

### Solidity interfaces and smart contracts:

`import {...} from '@unique-nft/solidity-abi/contracts'`
Unique interfaces and smart contracts solidity sources:

- CollectionHelpers.sol
- ContractHelpers.sol
- UniqueFungible.sol
- UniqueNFT.sol

### Precompiled ABI

`import {...} from '@unique-nft/solidity-abi/abi'`
Unique interfaces and smart contracts solidity sources:

- CollectionHelpers.json
- ContractHelpers.json
- UniqueFungible.json
- UniqueNFT.json

### Ethers ready-to-use factories and typescript types

```ts
import {
  UniqueFungible__factory,
  UniqueNFT__factory,
  CollectionHelpers__factory,
  ContractHelpers__factory,
  //typescript types:
  CollectionHelpers,
  ContractHelpers,
  UniqueNFT,
  UniqueFungible,
} from '@unique-nft/solidity/factory/ethers'
```

### Web3.js typescript types

```ts
import {
  CollectionHelpers,
  ContractHelpers,
  UniqueNFT,
  UniqueFungible,
} from '@unique-nft/solidity/factory/web3'
```

_note: it requires web3.js installed on your own, web3.js is a peer dependency for this project_

### Static addresses for Helpers interfaces:

|Interface|Address|
|---|---|
|collectionHelpers|0x6C4E9fE1AE37a41E93CEE429e8E1881aBdcbb54F|
|contractHelpers|0x842899ECF380553E8a4de75bF534cdf6fBF64049|

```ts
import {constants} from '@unique-nft/solidity'

console.log(constants.STATIC_ADDRESSES.collectionHelpers)
console.log(constants.STATIC_ADDRESSES.contractHelpers)
```
