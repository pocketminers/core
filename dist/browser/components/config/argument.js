var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { PocketObject } from "../base/object";
import { Metadata } from "../metadata";
import { BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { MultiHashUtilities } from "../../utilities/multiHash";
/**
 * Argument is a generic class that represents a key-value pair.
 *
 */
var Argument = /** @class */ (function (_super) {
    __extends(Argument, _super);
    /**
     * Constructor for the Argument class.
     */
    function Argument(_a) {
        var name = _a.name, value = _a.value, meta = _a.meta;
        var data = {
            name: name,
            value: value
        };
        var metadata = meta !== undefined ? new Metadata(meta) : new Metadata();
        return _super.call(this, data, metadata) || this;
    }
    Object.defineProperty(Argument.prototype, "name", {
        /**
         * The name of the argument.
         */
        get: function () {
            return this.data.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Argument.prototype, "value", {
        /**
         * The value of the argument.
         */
        get: function () {
            return this.data.value;
        },
        enumerable: false,
        configurable: true
    });
    Argument.prototype.toString = function () {
        var name = String(this.name);
        var value = this.value !== undefined ? JSON.stringify(this.value).replaceAll(/\"/g, '"') : "undefined"; // Convert value to string, handle undefined
        return "".concat(name, ": ").concat(value);
    };
    Argument.prototype.toJsonString = function () {
        return JSON.stringify(this.data).replaceAll(/\"/g, '"'); // Serialize with proper JSON format, including quotation marks
    };
    Argument.prototype.toKeyValuePair = function () {
        return [[this.name, this.value]];
    };
    Argument.prototype.toRecord = function () {
        var _a;
        return _a = {},
            _a[this.name] = this.value,
            _a;
    };
    Argument.prototype.toHashedIdentifier = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, MultiHashUtilities.generateIdentifier(this.toString())];
                    case 1:
                        hash = _a.sent();
                        return [2 /*return*/, {
                                type_: BaseIdentifierTypes.Multihash,
                                value: hash.value
                            }];
                }
            });
        });
    };
    Argument.fromRecord = function (record, meta) {
        if (record === undefined) {
            throw new Error("Record is required");
        }
        if (Object.keys(record).length === 0) {
            throw new Error("Record is empty");
        }
        if (Object.keys(record).length > 1) {
            throw new Error("Record must contain only one key-value pair");
        }
        var name = Object.keys(record)[0];
        var value = record[name];
        if (name === undefined) {
            throw new Error("Name is required");
        }
        if (value === undefined) {
            throw new Error("Value is required");
        }
        return new Argument({
            name: name,
            value: value,
            meta: meta
        });
    };
    Argument.fromKeyValuePair = function (keyValuePair, meta) {
        if (keyValuePair === undefined) {
            throw new Error("Key-value pair is required");
        }
        if (keyValuePair.length !== 2) {
            throw new Error("Key-value pair must contain exactly two elements");
        }
        var _a = __read(keyValuePair, 2), name = _a[0], value = _a[1];
        if (name === undefined) {
            throw new Error("Name is required");
        }
        if (value === undefined) {
            throw new Error("Value is required");
        }
        return new Argument({
            name: name,
            value: value,
            meta: meta
        });
    };
    Argument.fromString = function (str, meta) {
        if (!str) {
            throw new Error("String is required");
        }
        var parsed;
        try {
            console.log("Parsing string:", str);
            if (str.includes(":")) {
                var _a = __read(str.split(":").map(function (part) { return part.trim(); })), name_1 = _a[0], value = _a.slice(1);
                if (value.length === 0) {
                    throw new Error("Value is required in the serialized string");
                }
                var valueString = value.join(":").trim();
                if (valueString === "") {
                    throw new Error("Value is required in the serialized string");
                }
                parsed = {
                    name: name_1,
                    value: JSON.parse(valueString)
                };
            }
            else {
                var _b = __read(str.split("=").map(function (part) { return part.trim(); }), 2), name_2 = _b[0], value = _b[1];
                parsed = {
                    name: name_2,
                    value: JSON.parse(value)
                };
            }
        }
        catch (error) {
            throw new Error("Invalid string format for deserialization");
        }
        if (parsed.name === undefined || parsed.name === null) {
            throw new Error("Name is required in the serialized string");
        }
        if (parsed.value === undefined) {
            throw new Error("Value is required in the serialized string");
        }
        return new Argument({
            name: parsed.name,
            value: parsed.value,
            meta: meta
        });
    };
    return Argument;
}(PocketObject));
export { Argument };
//# sourceMappingURL=argument.js.map