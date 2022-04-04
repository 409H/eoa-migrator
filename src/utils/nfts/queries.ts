import { IResponseFromNftApi } from "./types"

export const getUserNftsFromApi = async (apiEndpoint: string, userAddress: string): Promise<IResponseFromNftApi> => {

    const endpoint = apiEndpoint.replace("{address}", userAddress)

    const response = await fetch(endpoint)

    // Check the response of the HTTP request
    if(!response.ok) {
        const body = await response.text();
        const bodyres = JSON.parse(body);

        // Try to gracefully handle the error
        switch(bodyres.code) {
            case "ERR_NO_DATA_PROVIDER" :
                throw new Error(bodyres.code)
            default: 
                throw new Error(`Unable to fetch nfts. HTTP Status ${response.status} - ${bodyres.message} (${bodyres.code}})`)
        }
    }

    // Check the response body
    const resp = await response.text()
    const res = JSON.parse(resp)

    const output: IResponseFromNftApi = res;

    return output;
}