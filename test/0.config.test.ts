const assert = require('assert');
const Ajv = require('Ajv');

import CONFIG from "@config"
import configSchema from '@schemas/config.schema.json';

/**
 * These are tests to ensure the application config is all correct so the
 * application can run. It checks against a schema to ensure it is valid.
 */

describe('Application config', function () {
    it('schema rule is valid', function() {
        const ajv = new Ajv({strict: false});
        const valid = ajv.validateSchema(configSchema);
        assert.equal(true, valid, `Invalid Schema for config file`);
    })
    it('has the correct structure', function() {
        const ajv = new Ajv({strict: false});
        const config = CONFIG
        const validate = ajv.compile(configSchema);
        const valid = validate(config);
        assert.equal(true, valid, `Invalid Schema for config in file CONFIG.json`);
    });
    it('chain has correct config entries', function() {
        /**
         * A chain within CHAINS should have;
         * a) 1 record in ETH_SCAN
         * b) 1 record in TOKENS.ENDPOINTS
         */

        const config = CONFIG
        config.CHAINS.map((chain) => {
            // See if the chain.chainId has an ETH_SCAN record
            const ethscan = CONFIG.ETH_SCAN.filter((scan) => scan.chainId === chain.chainId)

            // See if the chain.chainId has a TOKENS.ENDPOINTS record
            const tokens = CONFIG.TOKENS.ENDPOINTS.filter((tokens) => tokens.chainId === chain.chainId);

            assert.equal(1, ethscan.length, `No entry for chain ${chain.chainId} in CONFIG.ETH_SCAN`)
            assert.equal(1, tokens.length, `No entry for chain ${chain.chainId} in CONFIG.TOKENS.ENDPOINTS`)
        }) 
    })
});