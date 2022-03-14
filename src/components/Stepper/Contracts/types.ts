export interface IChain {
    chainId: number;
    name: string;
    bg: string;
    color: string;
    api: string;
    default_api_key: string;
    explorer_tx: string;
    explorer_addr: string;
    rpc: string;
}

export interface IContract {
    addr: string;
    hash: string;
    block: number;
}