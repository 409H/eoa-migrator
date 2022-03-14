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

        await getUserErc20AssetBalances(`https://api.mycryptoapi.com/eth`, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 1).then((walletAssets) => {
            const validate = ajv.compile(erc20AssetsSchema);
            const valid = validate(walletAssets);
            assert.equal(true, valid, `Invalid structure for assets returned on getUserErc20AssetBalances()`);
        })
    });
});