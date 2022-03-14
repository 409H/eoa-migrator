# EOA Migrator

This is a React app that has various different tools to help you realise what assets you have on your address and help you craft transactions to move those assets to an identified safe address.

## Design Considerations

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