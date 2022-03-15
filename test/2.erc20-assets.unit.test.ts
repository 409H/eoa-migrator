const assert = require('assert');
const Ajv = require('Ajv');

import erc20AssetsSchema from '@schemas/erc20.assets.schema.json';
import { getUserErc20AssetBalances } from '@utils/erc20'

describe('ERC20', function () {
    it('schema rule is valid', function() {
        const ajv = new Ajv({strict: false});
        const valid = ajv.validateSchema(erc20AssetsSchema);
        assert.equal(true, valid, `Invalid Schema rule for erc20 assets (erc20.assets.schema.json)`);
    })

    it('there are assets against an address', async function() {
        const ajv = new Ajv({strict: false, allErrors: true});

        await getUserErc20AssetBalances(`https://api.mycryptoapi.com/eth`, "0x4bbeEB066eD09B7AEd07bF39EEe0460DFa261520", 1).then((walletAssets) => {
            const validate = ajv.compile(erc20AssetsSchema);
            const valid = validate(walletAssets);
            assert.equal(true, valid, `Invalid structure for assets returned on getUserErc20AssetBalances()`);
        })
    });
});