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
import { BaseIdentifierFormats } from "../templates/v0/base/identifier.js";
import { Checks } from "./checks.js";
/**
 * MultiHashAlgorithms is an enum that represents the different hashing algorithms
 */
var MultiHashAlgorithms;
(function (MultiHashAlgorithms) {
    /**
     * SHA-256 is a cryptographic hash function that produces a 256-bit hash value.
     */
    MultiHashAlgorithms["SHA256"] = "SHA-256";
    /**
     * SHA-512 is a cryptographic hash function that produces a 512-bit hash value.
     */
    MultiHashAlgorithms["SHA512"] = "SHA-512";
    // /**
    //  * SHA3-256 is a cryptographic hash function that produces a 256-bit hash value.
    //  * - It is part of the SHA-3 family of hash functions.
    //  * - It is designed to be more secure than SHA-2.
    //  * - It is used in various applications, including digital signatures and certificates.
    //  * - It is also used in blockchain technology for hashing transactions and blocks.
    //  */
    // SHA3_256 = 'SHA3-256',
    // /**
    //  * SHA3-512 is a cryptographic hash function, from the SHA-3 family, that produces a 512-bit hash value
    //  */
    // SHA3_512 = 'SHA3-512',
    // /** BROKEN - DOESN'T WORK IN SUBTLE CRYPTO
    //  * BLAKE2 is a cryptographic hash function that is faster than MD5, SHA-1, and SHA-2.
    //  * - It is designed to be more secure than MD5 and SHA-1.
    //  */
    //  RIPEMD160 = 'RIPEMD160'
})(MultiHashAlgorithms || (MultiHashAlgorithms = {}));
// | MultiHashAlgorithms.SHA3_256
// | MultiHashAlgorithms.SHA3_512
// | MultiHashAlgorithms.RIPEMD160;
/**
 * MultiHashUtilities is a utility class that provides methods for hashing strings and generating multihashes.
 * - It uses the SubtleCrypto API for cryptographic operations.
 * - It provides methods for hashing strings, generating multihashes, and validating multihashes.
 * - It also provides methods for generating identifiers from multihashes.
 */
var MultiHashUtilities = /** @class */ (function () {
    function MultiHashUtilities() {
    }
    MultiHashUtilities.hashString = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var encoder, data, hashBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encoder = new TextEncoder();
                        data = encoder.encode(input);
                        return [4 /*yield*/, crypto.subtle.digest('SHA-256', data)];
                    case 1:
                        hashBuffer = _a.sent();
                        return [2 /*return*/, Array.from(new Uint8Array(hashBuffer))
                                .map(function (byte) { return byte.toString(16).padStart(2, '0'); })
                                .join('')];
                }
            });
        });
    };
    /**
     * Generates a multihash from a given string input.
     * The multihash is a hash of the input string, encoded in hexadecimal format.
     */
    MultiHashUtilities.generateMultihash = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hashString(input)];
                    case 1:
                        hash = _a.sent();
                        return [2 /*return*/, "0x".concat(hash)];
                }
            });
        });
    };
    /**
     * Generates a multihash from a given string input and returns it as a Identifier.
     */
    MultiHashUtilities.generateIdentifier = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generateMultihash(input)];
                    case 1:
                        hash = _a.sent();
                        return [2 /*return*/, {
                                format: BaseIdentifierFormats.Multihash,
                                value: hash
                            }];
                }
            });
        });
    };
    MultiHashUtilities.isValidMultihash = function (input) {
        var regex = /^0x[a-fA-F0-9]{64}$/;
        return regex.test(input);
    };
    MultiHashUtilities.hashStringWithAlgorithm = function (input, algorithm) {
        return __awaiter(this, void 0, void 0, function () {
            var encoder, data;
            return __generator(this, function (_a) {
                if (Checks.isEmpty(input)) {
                    throw new Error("Input string cannot be empty");
                }
                encoder = new TextEncoder();
                data = encoder.encode(input);
                return [2 /*return*/, crypto.subtle.digest(algorithm, data)
                        .then(function (hashBuffer) {
                        return Array.from(new Uint8Array(hashBuffer))
                            .map(function (byte) { return byte.toString(16).padStart(2, '0'); })
                            .join('');
                    })];
            });
        });
    };
    return MultiHashUtilities;
}());
export { MultiHashAlgorithms, MultiHashUtilities };
//# sourceMappingURL=multiHash.js.map