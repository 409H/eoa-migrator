# EOA Migrator

This is a React app that has various different tools to help you realise what assets you have on your address and help you craft transactions to move those assets to an identified safe address.

## Install

```bash
yarn install # install dependencies
yarn start # start development server
yarn test # run mocha tests
yarn test:components # run tests against react components

yarn build # build production
```

## Design Considerations

### Safe Address

The application relies on you configuring it for a safe address. As the application will be sending assets, such as ERC20, it is important to verify you own the keys to the safe address. You can do this by Signing a Message with your keys (this is offchain, requires no gas).

If the signature proof fails, the application will not proceed until the signature proof is valid. We don't want you to be accidentally sending assets to an address you don't own, or to an exchange address that might not support some tokens.

### Tokens

The application is configured to read from a [TokenList](https://uniswap.org/blog/token-lists) - by default, it uses the one hosted by CoinGecko. You can change this token list to something with different coverage (you can view them at https://tokenlists.org/). Additionally, if you have tokens that are not in a list, you can add them to the `ADDITIONAL_TOKENS` array within the `src/config.ts` file, with the following structure.

```
"ADDITIONAL_TOKENS": [{
    chainId: 56,
    address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
    symbol: "SHIB",
    decimals: 18,
    logoURI: ""
}]
```

## Limitations

### Non-proxying requests

As requests to third parties are not proxied (and thus cached), there can be instances in which requests can fail due to rate limiting or other factors which will render the application in a non-usable state for the time being the third-party is rate limiting. 

In the future, we do plan to proxy third-party requests so that we can have better responses from third-parties.

### EIP-17

Currently, the owned contracts checked for EIP173 interface only. It does this by calling `owner()` on the contract and if it is successful, it assumes EIP173 interface and allows you to call `transferOwnership()`.

### Gas estimation

On some assets views, the application will give you a rough gas estimation on all the transactions you'll need to perform on all the assets you have of that type. This is a _very rough_ gas estimation and uses a static `gas limit` to calculate. The math is `(gas limit * number of assets) * gas safe low`.