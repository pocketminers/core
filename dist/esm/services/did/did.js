import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { createJWT, verifyJWT, ES256KSigner, hexToBytes } from 'did-jwt';
import { generateKeyPair } from 'crypto';
const providerConfig = {
    networks: [{ name: 'mainnet', rpcUrl: 'https://mainnet.infura.io/v3/895e0e1f0dd642e5a3a0679edd63f7d5' }]
};
// const resolver = new Resolver(getResolver(providerConfig));
class DID {
    static createResolver({ networks }) {
        return new Resolver(getResolver({ networks }));
    }
    static async createPrivateKey() {
        let publicKey = '';
        let privateKey = '';
        await generateKeyPair('rsa', {
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
        return ES256KSigner(hexToBytes(privateKey));
    }
    static async createJWT({ issuer, signer }) {
        return await createJWT({ aud: issuer, iat: undefined, name: 'Pocket Network' }, { issuer: issuer, signer: signer }, { alg: 'ES256K' });
    }
    static async verifyJWT({ jwt, resolver }) {
        return await verifyJWT(jwt, { resolver });
    }
    static async verifyDID({ did, jwt, resolver }) {
        return await verifyJWT(jwt, { resolver, audience: did });
    }
}
export { DID };
//# sourceMappingURL=did.js.map