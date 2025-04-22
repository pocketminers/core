import { BaseObject, BaseObjectType } from "@templates/v0/base/object";
import { BaseIdentifier, BaseIdentifierFormat, BaseIdentifierFormats } from "@templates/v0/base/identifier";
import { Metadata } from "./metadata";
import { Freezer } from "@utilities/freezer";
import { MultiHashUtilities } from "@utilities/multiHash";
import { Checks } from "@utilities/checks";


class PocketObject
<
    D,
    I extends BaseIdentifierFormat,
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
            : Metadata.createDefaultMetadata<I, O>();

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
            return Metadata.createDefaultMetadata<I, O>({
                id: {
                    format: BaseIdentifierFormats.Multihash as I,
                    value: hash
                }
            });
        }

        if (metadata.labels.id?.format === BaseIdentifierFormats.Multihash) {
            const metadataHash = metadata.labels.id?.value;

            console.log("Metadata hash: ", metadataHash);
            console.log("Data hash: ", hash);

            if (
                Checks.isEmpty(metadataHash) === false
                && metadataHash !== hash
            ) {
                throw new Error("Data hash does not match metadata hash");
            }
        }
        else {
            metadata = new Metadata({
                ...metadata.toJSON(),
                labels: {
                    ...metadata.labels,
                    id: {
                        format: BaseIdentifierFormats.Multihash as I,
                        value: hash
                    }
                }
            });
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

    public async toMultiHashIdentifier(): Promise<BaseIdentifier<BaseIdentifierFormats.Multihash>> {
        const meta = await this.checkDataHash(this.data, this.metadata);

        if (meta.labels.id === undefined) {
            throw new Error("Metadata id is required");
        }

        return {
            format: BaseIdentifierFormats.Multihash,
            value: meta.labels.id?.value
        }
    }

}

export { 
    PocketObject
}