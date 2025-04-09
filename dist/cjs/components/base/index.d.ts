declare enum BaseComponentParts {
    Factory = "Factory",
    Storage = "Storage",
    Manager = "Manager",
    Configuration = "Configuration",
    Service = "Service"
}
type BaseComponentPartsType = keyof typeof BaseComponentParts;
declare class BaseComponent<C extends BaseComponentParts.Configuration, F extends BaseComponentParts.Factory, S extends BaseComponentParts.Storage, M extends BaseComponentParts.Manager, V extends BaseComponentParts.Service> {
    readonly config: C;
    readonly factory: F;
    readonly storage: S;
    readonly manager: M;
    readonly service: V;
    constructor({ config, factory, storage, manager, service }: {
        config: C;
        factory: F;
        storage: S;
        manager: M;
        service: V;
    });
}
type BaseComponentsTypes = {
    [key in BaseComponentPartsType]: BaseComponentsTypes[key];
};
export { BaseComponent, BaseComponentParts, BaseComponentsTypes };
//# sourceMappingURL=index.d.ts.map