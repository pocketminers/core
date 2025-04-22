/**
 * BaseComponentParts
 * This enum defines the different parts of a component.
 */
var BaseComponentParts;
(function (BaseComponentParts) {
    BaseComponentParts["Factory"] = "Factory";
    BaseComponentParts["Storage"] = "Storage";
    BaseComponentParts["Manager"] = "Manager";
    BaseComponentParts["Configuration"] = "Configuration";
    BaseComponentParts["Service"] = "Service";
    BaseComponentParts["PocketIdentity"] = "PocketIdentity";
})(BaseComponentParts || (BaseComponentParts = {}));
/**
 * BaseComponent
 * This class represents a base component.
 */
class BaseComponent {
    config;
    factory;
    storage;
    manager;
    service;
    constructor({ config, factory, storage, manager, service }) {
        this.config = config;
        this.factory = factory;
        this.storage = storage;
        this.manager = manager;
        this.service = service;
    }
}
export { BaseComponent, BaseComponentParts };
export * from './argument.js';
export * from './error.js';
export * from './factory.js';
export * from './identity.js';
export * from './message.js';
export * from './metadata.js';
export * from './object.js';
export * from './storage.js';
export * from './timestamp.js';
//# sourceMappingURL=index.js.map