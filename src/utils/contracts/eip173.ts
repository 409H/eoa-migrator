import { ethers, utils } from "ethers"

/**
 * Checks to see if we can read owner() from the contract. If it is successful, assume eip173
 * 
 * @param   provider
 * @param   contractAddress 
 * @returns 
 */
export const checkIfEip173 = async (provider: any, contractAddress: string): Promise<Boolean> => {
   
    const owner: string | boolean = await getContractOwner(provider, contractAddress);

    if(owner === null) {
        return false;
    }

    return true
}

/**
 * Fetches the owner of a contract
 * 
 * @param provider 
 * @param contractAddress 
 * @returns 
 */
export const getContractOwner = async (provider: any, contractAddress: string): Promise<string|boolean> => {
    const ABI = ["function owner() external view returns (address)"];
    const instance = new ethers.Contract(utils.getAddress(contractAddress), ABI, provider);
    
    let owner;
    try {
        owner = await instance.owner();
    } catch(e) {
        return null
    }

    return owner
}