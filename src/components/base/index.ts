
/**
 * BaseComponentParts
 * This enum defines the different parts of a component.
 */
enum BaseComponentParts {
    Factory = 'Factory',
    Storage = 'Storage',
    Manager = 'Manager',
    Configuration = 'Configuration',
    Service = 'Service',
    PocketIdentity = 'PocketIdentity'
}


/**
 * BaseComponentPartsType
 * This type defines the different parts of a component.
 */
type BaseComponentPartsType = keyof typeof BaseComponentParts;


/**
 * BaseComponent
 * This class represents a base component.
 */
class BaseComponent
<
    C extends BaseComponentParts.Configuration,
    F extends BaseComponentParts.Factory,
    S extends BaseComponentParts.Storage,
    M extends BaseComponentParts.Manager,
    V extends BaseComponentParts.Service
> {
    public readonly config: C;
    public readonly factory: F;
    public readonly storage: S;
    public readonly manager: M;
    public readonly service: V;

    constructor({
        config,
        factory,
        storage,
        manager,
        service
    }: {
        config: C;
        factory: F;
        storage: S;
        manager: M;
        service: V;
    }) {
        this.config = config;
        this.factory = factory;
        this.storage = storage;
        this.manager = manager;
        this.service = service;
    }
}

type BaseComponentsTypes = {
    [key in BaseComponentPartsType]: BaseComponentsTypes[key];
}


export {
    BaseComponent,
    BaseComponentParts,
    BaseComponentsTypes
}


export * from './error';
export * from './factory';
export * from './identity';
export * from './message';
export * from './metadata';
export * from './object';
export * from './storage';
export * from './timestamp';

