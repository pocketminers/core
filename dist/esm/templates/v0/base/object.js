/**
 * file: object.ts
 * description: This file contains the definition of the BaseObject type and its associated types.
 * It is used to represent various types of objects that can be used in the Pocket Network.
 */
/**
 * BaseObjectTypes is an enum that defines the various types of base objects.
 * These types are used to categorize different objects in the Pocket Network.
 * Each type is represented as a string.
 */
var BaseObjectTypes;
(function (BaseObjectTypes) {
    BaseObjectTypes["Argument"] = "Argument";
    BaseObjectTypes["Parameter"] = "Parameter";
    BaseObjectTypes["Property"] = "Property";
    BaseObjectTypes["Configuration"] = "Configuration";
    BaseObjectTypes["ConfigurationGroup"] = "ConfigurationGroup";
    BaseObjectTypes["Identifier"] = "Identifier";
    BaseObjectTypes["IdentifierGroup"] = "IdentifierGroup";
    BaseObjectTypes["Process"] = "Process";
    BaseObjectTypes["ProcessGroup"] = "ProcessGroup";
    BaseObjectTypes["Command"] = "Command";
    BaseObjectTypes["CommandGroup"] = "CommandGroup";
    BaseObjectTypes["Message"] = "Message";
    BaseObjectTypes["ErrorMessage"] = "ErrorMessage";
    BaseObjectTypes["Job"] = "Job";
    BaseObjectTypes["JobGroup"] = "JobGroup";
    BaseObjectTypes["JobTemplate"] = "JobTemplate";
    BaseObjectTypes["StorageItem"] = "StorageItem";
    BaseObjectTypes["Storage"] = "Storage";
    BaseObjectTypes["Custom"] = "Custom";
    BaseObjectTypes["Undefined"] = "Undefined";
    BaseObjectTypes["Unknown"] = "Unknown";
})(BaseObjectTypes || (BaseObjectTypes = {}));
export { BaseObjectTypes, };
//# sourceMappingURL=object.js.map