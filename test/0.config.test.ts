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
});