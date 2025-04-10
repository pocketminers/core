import { BaseObject, BaseObjectType } from "../../templates/v0/base/object";
import { BaseMetadata } from "../../templates/v0/base/metadata";
import { BaseIdentifierType } from "../../templates/v0/base/identifier";
declare class PocketObject<D, I extends BaseIdentifierType, T extends BaseObjectType> implements BaseObject<D, I, T> {
    data: D;
    metadata: BaseMetadata<I, T>;
    constructor(data: D, metadata?: BaseMetadata<I, T>);
    get dataString(): string;
    get metadataString(): string;
    get objectString(): string;
}
export { PocketObject };
//# sourceMappingURL=object.d.ts.map