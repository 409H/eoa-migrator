export interface IGetUserNFTs {
    error: string;
    tokens: any[];
    provider: string | null;
    loading: boolean;
}

export interface INftTokenEntry {
    token: INftToken[]
}

interface INftToken {
    contract: string;
    tokenId: string;
    name: string | null;
    image: string | null;
    collection: INftCollection;
    ownership: INftOwnership;
}

interface INftCollection {
    id: string;
    name: string | null;
}

interface INftOwnership {
    tokenCount: string;
    onSaleCount: string;
    floorAskPrice: string | null;
}

export interface INftEndpoints {
    chainId: number;
    endpoint: string;
}