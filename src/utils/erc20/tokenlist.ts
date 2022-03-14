import { utils } from "ethers"
import { ITokenList, IUserAssetsWithBalance } from "./types"
import { getTokensBalance } from "@mycrypto/eth-scan"
import CONFIG from "@config"

export const listErc20AssetsToSearch = async (chainId: number): Promise<ITokenList[]> => {
    const { TOKENS } = CONFIG;
    const response = await fetch(TOKENS.ENDPOINT)

    // Check the response of the HTTP request
    if(!response.ok) {
        throw new Error(`Unable to fetch token list. HTTP Status ${response.status}`)
    }

    // Check the response body
    const resp = await response.text()
    const res = JSON.parse(resp)

    let output: any = [
        ...TOKENS.ADDITIONAL_TOKENS
    ];

    // Tokens exist
    output = [
        ...output,
        ...res.tokens
    ]

    // Filter by chain ID
    const assets = output.filter((token: ITokenList) => token.chainId == chainId)

    return assets;
}

export const getUserErc20AssetBalances = async (rpcEndpoint: string, userAddress: string, chainId: number): Promise<IUserAssetsWithBalance> => {
    const assets = await listErc20AssetsToSearch(chainId);
    const assetAddresses = assets.map(asset => asset.address) 

    const contractAddressForChain = CONFIG.ETH_SCAN.filter((es: {chainId: number, contractAddress: string}) => es.chainId === chainId)[0].contractAddress
    const assetBalances = await getTokensBalance(
        rpcEndpoint, 
        utils.getAddress(userAddress),
        assetAddresses,
        {
            contractAddress: utils.getAddress(contractAddressForChain)
        }
    ).then((res) => {
        // Filter out with assets that do not have a balance
        const assetsWithBalance = Object.entries(res).filter(([key, value]) => value > 0)
        return Object.fromEntries(assetsWithBalance)
    });

    // Get the asset details and add the balance to it
    const userAssetsWithBalances = assets.filter(asset => Object.keys(assetBalances).includes(asset.address))

    const userAssetBalances = userAssetsWithBalances.reduce((assets: any, asset) => {
        const balance = Object.values(
                    Object.fromEntries(
                        Object.entries(assetBalances).filter(([key]) => utils.getAddress(asset.address) === utils.getAddress(key))
                    )
                )[0]

        assets[asset.address] = {
            ...asset, 
            balance: balance.toString()
        }

        return Object.values(assets);

    }, {})

    return {
        "address": userAddress, 
        "assets": {
            "erc20": userAssetBalances.length ? userAssetBalances : []
        }
    }
}