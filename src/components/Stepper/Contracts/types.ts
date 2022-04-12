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

export interface IContract {
    addr: string;
    hash: string;
    block: number;
}