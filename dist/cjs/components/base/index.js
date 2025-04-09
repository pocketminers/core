"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponentParts = exports.BaseComponent = void 0;
var BaseComponentParts;
(function (BaseComponentParts) {
    BaseComponentParts["Factory"] = "Factory";
    BaseComponentParts["Storage"] = "Storage";
    BaseComponentParts["Manager"] = "Manager";
    BaseComponentParts["Configuration"] = "Configuration";
    BaseComponentParts["Service"] = "Service";
})(BaseComponentParts || (exports.BaseComponentParts = BaseComponentParts = {}));
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
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=index.js.map