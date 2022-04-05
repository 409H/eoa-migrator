import { ITokenList } from "../../../utils/erc20/types"

export interface IChain {
    chainId: number;
    name: string;
    bg: string;
    color: string;
    api: string;
    explorer_tx: string;
    explorer_addr: string;
    rpc: string;
}

export interface IGetTokenBalances {
    tokens: ITokenList[];
    loading: boolean;
    error: null | string;
}