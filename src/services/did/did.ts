import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { createJWT, verifyJWT, JWTVerified, ES256KSigner, hexToBytes, Signer } from 'did-jwt';
import { generateKeyPair } from 'crypto';


const providerConfig = {
    networks: [{ name: 'mainnet', rpcUrl: 'https://mainnet.infura.io/v3/895e0e1f0dd642e5a3a0679edd63f7d5' }]
};

// const resolver = new Resolver(getResolver(providerConfig));

class DID {
    public static createResolver({
        networks
    }: {
        networks: Array<{ name: string, rpcUrl: string }>
    }) {
        return new Resolver(getResolver({ networks }));
    }

    public static async createPrivateKey(): Promise<{
        publicKey: string,
        privateKey: string
    }> {
        let publicKey: string = '';
        let privateKey: string = '';
    
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
        },  (err, publicKey, privateKey) => {
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
        }
    }

    public static getSigner({
        privateKey
    }: {
        privateKey: string
    }): Signer {
        return ES256KSigner(hexToBytes(privateKey));
    }

    public static async createJWT({
        issuer,
        signer
    }: {
        issuer: string,
        signer: Signer
    }) {
        return await createJWT(
            { aud: issuer , iat: undefined, name: 'Pocket Network' },
            { issuer: issuer, signer: signer },
            { alg: 'ES256K' }
        );
    }

    public static async verifyJWT({
        jwt,
        resolver
    }: {
        jwt: string,
        resolver: Resolver
    }): Promise<JWTVerified> {
        return await verifyJWT(jwt, { resolver });
    }

    public static async verifyDID({
        did,
        jwt,
        resolver
    }: {
        did: string,
        jwt: string,
        resolver: Resolver
    }): Promise<JWTVerified> {
        return await verifyJWT(jwt, { resolver, audience: did });
    }

}

export {
    DID
}