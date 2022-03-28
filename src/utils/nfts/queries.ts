import { IResponseFromNftApi } from "./types"

export const getUserNftsFromApi = async (apiEndpoint: string, userAddress: string): Promise<IResponseFromNftApi> => {

    const endpoint = apiEndpoint.replace("{address}", userAddress)

    const response = await fetch(endpoint)

    // Check the response of the HTTP request
    if(!response.ok) {
        const body = await response.text();
        const bodyres = JSON.parse(body);
        console.log(bodyres)
        throw new Error(`Unable to fetch nfts. HTTP Status ${response.status} - ${bodyres.code}`)
    }

    // Check the response body
    const resp = await response.text()
    const res = JSON.parse(resp)

    const output: IResponseFromNftApi = res;

    return output;
}