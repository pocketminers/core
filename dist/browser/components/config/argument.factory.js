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
import { Argument } from "../config/argument.js";
import { PocketFactory } from "../base/factory.js";
var ArgumentFactory = /** @class */ (function (_super) {
    __extends(ArgumentFactory, _super);
    function ArgumentFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArgumentFactory.fromRecord = function (record, meta) {
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
    ArgumentFactory.fromKeyValuePair = function (keyValuePair, meta) {
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
    ArgumentFactory.fromString = function (str, meta) {
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
    /**
     * Creates a new Argument instance from JSON.
     */
    ArgumentFactory.fromJSON = function (json, meta) {
        if (!json) {
            throw new Error("JSON string is required");
        }
        var parsed;
        try {
            parsed = JSON.parse(json);
        }
        catch (error) {
            throw new Error("Invalid JSON string");
        }
        if (parsed.name === undefined || parsed.name === null) {
            throw new Error("Name is required in the JSON string");
        }
        if (parsed.value === undefined) {
            throw new Error("Value is required in the JSON string");
        }
        return new Argument({
            name: parsed.name,
            value: parsed.value,
            meta: meta
        });
    };
    /**
     * Creates an array of Argument instances.
     * @param args - An array of objects containing name, value, and optional metadata for each argument.
     * @returns An array of Argument instances.
     */
    ArgumentFactory.fromArray = function (args) {
        if (!Array.isArray(args) || args.length === 0) {
            throw new Error("An array of arguments is required");
        }
        return args.map(function (_a) {
            var name = _a.name, value = _a.value, meta = _a.meta;
            if (name === undefined || name === null) {
                throw new Error("Name is required for each argument");
            }
            return new Argument({
                name: name,
                value: value,
                meta: meta
            });
        });
    };
    ArgumentFactory.fromKeyValuePairs = function () {
        var keyValuePairs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keyValuePairs[_i] = arguments[_i];
        }
        if (!Array.isArray(keyValuePairs) || keyValuePairs.length === 0) {
            throw new Error("An array of key-value pairs is required");
        }
        return keyValuePairs.map(function (_a) {
            var _b = __read(_a, 2), name = _b[0], value = _b[1];
            if (name === undefined || name === null) {
                throw new Error("Name is required for each argument");
            }
            return new Argument({
                name: name,
                value: value
            });
        });
    };
    ArgumentFactory.fromRecords = function () {
        var records = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            records[_i] = arguments[_i];
        }
        if (!Array.isArray(records) || records.length === 0) {
            throw new Error("An array of records is required");
        }
        return records.map(function (record) {
            if (record === undefined || Object.keys(record).length === 0) {
                throw new Error("Record is required");
            }
            return ArgumentFactory.fromRecord(record);
        });
    };
    return ArgumentFactory;
}(PocketFactory));
export { ArgumentFactory };
//# sourceMappingURL=argument.factory.js.map