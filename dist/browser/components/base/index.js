var BaseComponentParts;
(function (BaseComponentParts) {
    BaseComponentParts["Factory"] = "Factory";
    BaseComponentParts["Storage"] = "Storage";
    BaseComponentParts["Manager"] = "Manager";
    BaseComponentParts["Configuration"] = "Configuration";
    BaseComponentParts["Service"] = "Service";
})(BaseComponentParts || (BaseComponentParts = {}));
var BaseComponent = /** @class */ (function () {
    function BaseComponent(_a) {
        var config = _a.config, factory = _a.factory, storage = _a.storage, manager = _a.manager, service = _a.service;
        this.config = config;
        this.factory = factory;
        this.storage = storage;
        this.manager = manager;
        this.service = service;
    }
    return BaseComponent;
}());
export { BaseComponent, BaseComponentParts };
//# sourceMappingURL=index.js.map