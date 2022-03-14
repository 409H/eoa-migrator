const assert = require('assert');
const Ajv = require('Ajv');

import signedMessageSchema from '@schemas/signed-message.schema.json';
import { verifySignedMessage } from '@utils/signedMessage';

const validMessage = require("@artifacts/safe_address/valid.json")
const invalidMessage = require("@artifacts/safe_address/invalid.json")

describe('UserAddresses::SafeAddress', function () {
    it('schema rule is valid', function() {
        const ajv = new Ajv({strict: false});
        const valid = ajv.validateSchema(signedMessageSchema);
        assert.equal(true, valid, `Invalid Schema for safe address (signedMessageSchema)`);
    })

    it('should return false on an invalid signature of proof of ownership keys on the safe address', function () {
        assert.equal(verifySignedMessage(invalidMessage), false);
    });
    
    it('should return true on a valid signature of proof of ownership keys on the safe address', function () {
        assert.equal(verifySignedMessage(validMessage), true);
    });

});