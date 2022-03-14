import { verifyMessage } from '@ethersproject/wallet';
import { utils } from 'ethers';
import { ISignedMessage } from "./types"

/**
 * Verifies to see if the signed message was signed by who it says it was
 * @param signedMessage 
 * @returns bool
 */
const verifySignedMessageValid = (signedMessage: ISignedMessage) => {
    const { address, msg, sig } = signedMessage;

    let signer;
    try {
        signer = verifyMessage(msg, sig)
    } catch(e) {
        throw new Error(`Signed message cannot be validated - ${e}`)
    }

    return (signer === utils.getAddress(address))
}

/**
 * Verify Signed Message
 * @param signedMessage A JSON string holding the signed message object
 */
 export const verifySignedMessage = (signedMessage: ISignedMessage) => {
    const isValid : boolean = verifySignedMessageValid(signedMessage)

    return isValid;
}