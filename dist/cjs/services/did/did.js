"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DID = void 0;
const did_resolver_1 = require("did-resolver");
const ethr_did_resolver_1 = require("ethr-did-resolver");
const did_jwt_1 = require("did-jwt");
const crypto_1 = require("crypto");
const providerConfig = {
    networks: [{ name: 'mainnet', rpcUrl: 'https://mainnet.infura.io/v3/895e0e1f0dd642e5a3a0679edd63f7d5' }]
};
// const resolver = new Resolver(getResolver(providerConfig));
class DID {
    static createResolver({ networks }) {
        return new did_resolver_1.Resolver((0, ethr_did_resolver_1.getResolver)({ networks }));
    }
    static async createPrivateKey() {
        let publicKey = '';
        let privateKey = '';
        await (0, crypto_1.generateKeyPair)('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        }, (err, publicKey, privateKey) => {
            if (err) {
                console.error('Error generating keys:', err);
                return;
            }
            console.log('Public Key:', publicKey);
            console.log('Private Key:', privateKey);
            publicKey = publicKey;
            privateKey = privateKey;
        });
        return {
            publicKey,
            privateKey
        };
    }
    static getSigner({ privateKey }) {
        return (0, did_jwt_1.ES256KSigner)((0, did_jwt_1.hexToBytes)(privateKey));
    }
    static async createJWT({ issuer, signer }) {
        return await (0, did_jwt_1.createJWT)({ aud: issuer, iat: undefined, name: 'Pocket Network' }, { issuer: issuer, signer: signer }, { alg: 'ES256K' });
    }
    static async verifyJWT({ jwt, resolver }) {
        return await (0, did_jwt_1.verifyJWT)(jwt, { resolver });
    }
    static async verifyDID({ did, jwt, resolver }) {
        return await (0, did_jwt_1.verifyJWT)(jwt, { resolver, audience: did });
    }
}
exports.DID = DID;
//# sourceMappingURL=did.js.map