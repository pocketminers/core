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
import { BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { Metadata } from "../metadata";
import { Freezer } from "../../utilities/freezer";
import { MultiHashUtilities } from "../../utilities/multiHash";
import { MetadataFactory } from "../metadata/metadata.factory";
var PocketObject = /** @class */ (function () {
    function PocketObject(_a) {
        var data = _a.data, metadata = _a.metadata;
        this.checkData(data);
        this.checkMetadata(metadata);
        this.data = data;
        this.metadata = metadata !== undefined
            ? new Metadata(metadata)
            : MetadataFactory.createDefaultMetadata();
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
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.checkData(data);
                        return [4 /*yield*/, MultiHashUtilities.generateMultihash(this.dataString)];
                    case 1:
                        hash = _b.sent();
                        if (metadata === undefined) {
                            return [2 /*return*/, MetadataFactory.createDefaultMetadata({
                                    id: {
                                        type_: BaseIdentifierTypes.Multihash,
                                        value: hash
                                    }
                                })];
                        }
                        metadataHash = (_a = metadata.labels.id) === null || _a === void 0 ? void 0 : _a.value;
                        if (metadataHash !== undefined && metadataHash !== hash) {
                            throw new Error("Data hash does not match metadata hash");
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
    return PocketObject;
}());
export { PocketObject };
//# sourceMappingURL=object.js.map