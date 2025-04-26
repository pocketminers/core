import { Resolver } from 'did-resolver';
import { JWTVerified, Signer } from 'did-jwt';
declare class DID {
    static createResolver({ networks }: {
        networks: Array<{
            name: string;
            rpcUrl: string;
        }>;
    }): Resolver;
    static createPrivateKey(): Promise<{
        publicKey: string;
        privateKey: string;
    }>;
    static getSigner({ privateKey }: {
        privateKey: string;
    }): Signer;
    static createJWT({ issuer, signer }: {
        issuer: string;
        signer: Signer;
    }): Promise<string>;
    static verifyJWT({ jwt, resolver }: {
        jwt: string;
        resolver: Resolver;
    }): Promise<JWTVerified>;
    static verifyDID({ did, jwt, resolver }: {
        did: string;
        jwt: string;
        resolver: Resolver;
    }): Promise<JWTVerified>;
}
export { DID };
//# sourceMappingURL=did.d.ts.map