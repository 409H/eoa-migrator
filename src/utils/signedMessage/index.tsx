/**
 * An address identified to a user as "safe" requires us to ensure they own the keys to that address
 * as we will likely be sending tokens to this address and if the "safe" address is to an exchange
 * address then the user will have lost ownership of these assets.
 */

export { verifySignedMessage } from "./verifySignedMessage"