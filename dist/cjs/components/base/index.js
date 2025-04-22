"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponentParts = exports.BaseComponent = void 0;
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
})(BaseComponentParts || (exports.BaseComponentParts = BaseComponentParts = {}));
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
exports.BaseComponent = BaseComponent;
__exportStar(require("./error.js"), exports);
__exportStar(require("./factory.js"), exports);
__exportStar(require("./identity.js"), exports);
__exportStar(require("./message.js"), exports);
__exportStar(require("./metadata.js"), exports);
__exportStar(require("./object.js"), exports);
__exportStar(require("./storage.js"), exports);
__exportStar(require("./timestamp.js"), exports);
//# sourceMappingURL=index.js.map