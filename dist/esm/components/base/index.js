var BaseComponentParts;
(function (BaseComponentParts) {
    BaseComponentParts["Factory"] = "Factory";
    BaseComponentParts["Storage"] = "Storage";
    BaseComponentParts["Manager"] = "Manager";
    BaseComponentParts["Configuration"] = "Configuration";
    BaseComponentParts["Service"] = "Service";
})(BaseComponentParts || (BaseComponentParts = {}));
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
export * from './factory';
export * from './object';
export * from './storage';
//# sourceMappingURL=index.js.map