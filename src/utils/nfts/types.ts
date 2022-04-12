export interface IResponseFromNftApi {
    response: string;
    data: IResponseFromNftApi_Data
}

interface IResponseFromNftApi_Data {
    address: string;
    provider: string;
    totalAssets: number | null;
    collections: IResponseFromNftApi_Data_Collections[];
}

export interface IResponseFromNftApi_Data_Collections {
    contractAddress: string;
    collectionName: string;
    assets: IResponseFromNftApi_Data_Assets[];
}

export interface IResponseFromNftApi_Data_Assets {
    id: string;
    name: string;
    image: string;
    owner: string;
    traits: any[]
}