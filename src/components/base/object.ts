import { BaseObject, BaseObjectType } from "../../templates/v0/base/object";
import { BaseIdentifierType, BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { Metadata } from "@components/metadata";
import { Freezer } from "@utilities/freezer";
import { MultiHashUtilities } from "@utilities/multiHash";
import { MetadataFactory } from "@components/metadata/metadata.factory";


class PocketObject
<
    D,
    I extends BaseIdentifierType,
    O extends BaseObjectType
>
    implements BaseObject<D, I, O>
{    
    data: D;
    metadata: Metadata<I, O>;

    constructor({
        data,
        metadata
    }:{
        data: D,
        metadata?: Metadata<I, O>
    }){
        this.checkData(data);
        this.checkMetadata(metadata);

        this.data = data;
        this.metadata = metadata !== undefined
            ? new Metadata(metadata)
            : MetadataFactory.createDefaultMetadata<I, O>();

        Freezer.deepFreeze(this);
    }

    private checkData(data: D): void {
        if (data === undefined) {
            throw new Error("Data is required");
        }
    }

    private checkMetadata(metadata?: Metadata<I, O>) {
    }

    /**
     * TODO: Revisit this method to use the metadata object
     */
    private async checkDataHash(data: D, metadata?: Metadata<I,O>): Promise<Metadata<I, O>> {
        this.checkData(data);

        const hash = await MultiHashUtilities.generateMultihash(this.dataString);
        
        if (metadata === undefined) {
            return MetadataFactory.createDefaultMetadata<I, O>({
                id: {
                    type_: BaseIdentifierTypes.Multihash as I,
                    value: hash
                }
            });
        }

        const metadataHash = metadata.labels.id?.value;

        if (metadataHash !== undefined && metadataHash !== hash) {
            throw new Error("Data hash does not match metadata hash");
        }

        return metadata;
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

    public get objectType() {
        return this.metadata.labels?.type;
    }

    public isEmpty(): boolean {
        return this.data === undefined
            || this.dataString === "{}"
            || this.dataString === "[]"
            || this.dataString === ""
            || this.dataString === "null"
            || this.dataString === "undefined";
    }
}

export { 
    PocketObject
}