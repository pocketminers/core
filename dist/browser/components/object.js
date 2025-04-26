var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { PocketMetadata } from "./metadata.js";
import { Freezer } from "../utilities/freezer.js";
import { MultiHashUtilities } from "../utilities/multiHash.js";
import { Checks } from "../utilities/checks.js";
/**
 * PocketObject is a class that represents an object in the Pocket framework.
 * - It is a generic class that can be used with different types of data and metadata.
 * - The class is designed to be immutable after creation.
 *
 * @template D - The type of the data. It can be any type.
 * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
 * @template O - The type of the object. It is one of the BaseObjectType types.
 */
var PocketObject = /** @class */ (function () {
    function PocketObject(_a) {
        var data = _a.data, metadata = _a.metadata;
        this.checkData(data);
        this.checkMetadata(metadata);
        this.data = data;
        this.metadata = metadata !== undefined
            ? new PocketMetadata(metadata)
            : PocketMetadata.createDefaultMetadata();
        Freezer.deepFreeze(this);
    }
    PocketObject.prototype.checkData = function (data) {
        if (data === undefined) {
            throw new Error("Data is required");
        }
    };
    PocketObject.prototype.checkMetadata = function (metadata) {
    };
    /**
     * TODO: Revisit this method to use the metadata object
     */
    PocketObject.prototype.checkDataHash = function (data, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, metadataHash;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.checkData(data);
                        return [4 /*yield*/, MultiHashUtilities.generateMultihash(this.dataString)];
                    case 1:
                        hash = _c.sent();
                        if (metadata === undefined) {
                            return [2 /*return*/, PocketMetadata.createDefaultMetadata({
                                    id: {
                                        format: BaseIdentifierFormats.Multihash,
                                        value: hash
                                    }
                                })];
                        }
                        if (((_a = metadata.labels.id) === null || _a === void 0 ? void 0 : _a.format) === BaseIdentifierFormats.Multihash) {
                            metadataHash = (_b = metadata.labels.id) === null || _b === void 0 ? void 0 : _b.value;
                            console.log("PocketMetadata hash: ", metadataHash);
                            console.log("Data hash: ", hash);
                            if (Checks.isEmpty(metadataHash) === false
                                && metadataHash !== hash) {
                                throw new Error("Data hash does not match metadata hash");
                            }
                        }
                        else {
                            metadata = new PocketMetadata(__assign(__assign({}, metadata.toJSON()), { labels: __assign(__assign({}, metadata.labels), { id: {
                                        format: BaseIdentifierFormats.Multihash,
                                        value: hash
                                    } }) }));
                        }
                        return [2 /*return*/, metadata];
                }
            });
        });
    };
    Object.defineProperty(PocketObject.prototype, "dataString", {
        get: function () {
            return JSON.stringify(this.data);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PocketObject.prototype, "metadataString", {
        get: function () {
            return JSON.stringify(this.metadata);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PocketObject.prototype, "objectString", {
        get: function () {
            return JSON.stringify(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PocketObject.prototype, "objectType", {
        get: function () {
            var _a;
            return (_a = this.metadata.labels) === null || _a === void 0 ? void 0 : _a.type;
        },
        enumerable: false,
        configurable: true
    });
    PocketObject.prototype.isEmpty = function () {
        return this.data === undefined
            || this.dataString === "{}"
            || this.dataString === "[]"
            || this.dataString === ""
            || this.dataString === "null"
            || this.dataString === "undefined";
    };
    PocketObject.prototype.toMultiHashIdentifier = function () {
        return __awaiter(this, void 0, void 0, function () {
            var meta;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.checkDataHash(this.data, this.metadata)];
                    case 1:
                        meta = _b.sent();
                        if (meta.labels.id === undefined) {
                            throw new Error("PocketMetadata id is required");
                        }
                        return [2 /*return*/, {
                                format: BaseIdentifierFormats.Multihash,
                                value: (_a = meta.labels.id) === null || _a === void 0 ? void 0 : _a.value
                            }];
                }
            });
        });
    };
    return PocketObject;
}());
export { PocketObject };
//# sourceMappingURL=object.js.map