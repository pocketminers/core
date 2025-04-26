var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { createJWT, verifyJWT, ES256KSigner, hexToBytes } from 'did-jwt';
import { generateKeyPair } from 'crypto';
var providerConfig = {
    networks: [{ name: 'mainnet', rpcUrl: 'https://mainnet.infura.io/v3/895e0e1f0dd642e5a3a0679edd63f7d5' }]
};
// const resolver = new Resolver(getResolver(providerConfig));
var DID = /** @class */ (function () {
    function DID() {
    }
    DID.createResolver = function (_a) {
        var networks = _a.networks;
        return new Resolver(getResolver({ networks: networks }));
    };
    DID.createPrivateKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var publicKey, privateKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        publicKey = '';
                        privateKey = '';
                        return [4 /*yield*/, generateKeyPair('rsa', {
                                modulusLength: 2048,
                                publicKeyEncoding: {
                                    type: 'spki',
                                    format: 'pem'
                                },
                                privateKeyEncoding: {
                                    type: 'pkcs8',
                                    format: 'pem'
                                }
                            }, function (err, publicKey, privateKey) {
                                if (err) {
                                    console.error('Error generating keys:', err);
                                    return;
                                }
                                console.log('Public Key:', publicKey);
                                console.log('Private Key:', privateKey);
                                publicKey = publicKey;
                                privateKey = privateKey;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                publicKey: publicKey,
                                privateKey: privateKey
                            }];
                }
            });
        });
    };
    DID.getSigner = function (_a) {
        var privateKey = _a.privateKey;
        return ES256KSigner(hexToBytes(privateKey));
    };
    DID.createJWT = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var issuer = _b.issuer, signer = _b.signer;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, createJWT({ aud: issuer, iat: undefined, name: 'Pocket Network' }, { issuer: issuer, signer: signer }, { alg: 'ES256K' })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    DID.verifyJWT = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var jwt = _b.jwt, resolver = _b.resolver;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, verifyJWT(jwt, { resolver: resolver })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    DID.verifyDID = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var did = _b.did, jwt = _b.jwt, resolver = _b.resolver;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, verifyJWT(jwt, { resolver: resolver, audience: did })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    return DID;
}());
export { DID };
//# sourceMappingURL=did.js.map