const assert = require('assert')
const { ethers } = require("ethers");

import { checkIfEip173 } from "@utils/contracts"

describe('Contract Detection', function () {
    /**
     * Test to see if we can detect EIP173 using the util fn
     */
    it('can detect eip173', async function() {
        // network polygon
        const provider = new ethers.providers.JsonRpcProvider(`https://polygon-rpc.com`);

        const contracts = {
            "0x602d1e6f9d27e2dcd248f55212e69c0fdda81ed1": true, // Ownable from QA Contract
            "0x2953399124f0cbb46d2cbacd8a89cf0599974963": true, // OpenSea StoreFront Contract
            "0xc60ca833aef1911c17d4e69fda9de6850402f6e5": false, // BalanceScanner Contract
            "0x11b6a5fe2906f3354145613db0d99ceb51f604c9": false,  // EOA
        }

        for(const contractAddr in contracts) {
            const res = await checkIfEip173(provider, contractAddr);
            assert.equal(contracts[contractAddr], res, `Faulty detection on ${contractAddr} with EIP173.`)
        }

    })
});