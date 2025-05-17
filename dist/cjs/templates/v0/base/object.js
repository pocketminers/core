"use strict";
/**
 * file: object.ts
 * description: This file contains the definition of the BaseObject type and its associated types.
 * It is used to represent various types of objects that can be used in the Pocket Network.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseObjects = void 0;
/**
 * BaseObjects is an enum that defines the various types of base objects.
 * These types are used to categorize different objects in the Pocket Network.
 * Each type is represented as a string.
 */
var BaseObjects;
(function (BaseObjects) {
    BaseObjects["Identifier"] = "Identifier";
    BaseObjects["Configuration"] = "Configuration";
    BaseObjects["Process"] = "Process";
    BaseObjects["Command"] = "Command";
    BaseObjects["Job"] = "Job";
    BaseObjects["Custom"] = "Custom";
    BaseObjects["Undefined"] = "Undefined";
    BaseObjects["Unknown"] = "Unknown";
})(BaseObjects || (exports.BaseObjects = BaseObjects = {}));
//# sourceMappingURL=object.js.map