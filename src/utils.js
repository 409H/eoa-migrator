import { utils } from 'web3'
const utf8 = require('utf8')

export function getDomainTokenId(domain) {
    const labelHash = getDomainLabelHash(domain)
    return new utils.BN(labelHash).toString()
}

export function getDomainLabelHash(domain) {
    return utils.keccak256(utf8.encode(domain))
}