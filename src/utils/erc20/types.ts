export interface ITokenList {
    chainId: number,
    address: string,
    name?: string,
    symbol: string,
    decimals: number,
    logoURI?: string,
    balance?: bigint
}

export interface IAssetTypes {
    erc20: ITokenList[]
}

export interface IUserAssetsWithBalance {
    address: string,
    assets: IAssetTypes
}