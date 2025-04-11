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
import { Argument } from "../config/argument";
var ArgumentFactory = /** @class */ (function () {
    function ArgumentFactory() {
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
    return ArgumentFactory;
}());
export { ArgumentFactory };
//# sourceMappingURL=argument.factory.js.map