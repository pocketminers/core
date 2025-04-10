import { BaseObject, BaseObjectType, BaseObjectTypes } from "../../templates/v0/base/object";
import { BaseMetadata } from "../../templates/v0/base/metadata";
import { BaseIdentifierType, BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { Metadata } from "@components/metadata";
import { Freezer } from "@utilities/freezer";


class PocketObject
<
    D,
    I extends BaseIdentifierType,
    T extends BaseObjectType
>
    implements BaseObject<D, I, T>
{    
    data: D;
    metadata: BaseMetadata<I, T>;

    constructor(data: D, metadata?: BaseMetadata<I, T>) {
        this.data = data;
        this.metadata = metadata !== undefined ? metadata : Metadata.createDefaultMetadata<I, T>();

        Freezer.deepFreeze(this);
    }

    public get dataString() {
        return JSON.stringify(this.data);
    }

    public get metadataString() {
        return JSON.stringify(this.metadata);
    }

    public get objectString() {
        return JSON.stringify(this);
    }
    
}

export { 
    PocketObject
}