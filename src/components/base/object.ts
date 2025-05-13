import { BaseObject, BaseObjectType } from "@templates/v0/base/object";
import { BaseIdentifier, BaseIdentifierFormat, BaseIdentifierFormats } from "@templates/v0/base/identifier";
import { PocketMetadata } from "./metadata";
import { Freezer } from "@utilities/freezer";
import { MultiHashUtilities } from "@utilities/multiHash";
import { Checks } from "@utilities/checks";


/**
 * PocketObject is a class that represents an object in the Pocket framework.
 * - It is a generic class that can be used with different types of data and metadata.
 * - The class is designed to be immutable after creation.
 * 
 * @template D - The type of the data. It can be any type.
 * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
 * @template O - The type of the object. It is one of the BaseObjectType types.
 */
class PocketObject
<
    D,
    I extends BaseIdentifierFormat,
    O extends BaseObjectType
>
    implements BaseObject<D, I, O>
{    
    data: D;
    metadata: PocketMetadata<I, O>;

    constructor({
        data,
        metadata
    }:{
        data: D,
        metadata?: PocketMetadata<I, O>
    }){
        this.checkData(data);
        this.checkMetadata(metadata);

        this.data = data;
        this.metadata = metadata !== undefined
            ? new PocketMetadata(metadata)
            : PocketMetadata.createDefaultMetadata<I, O>();

        Freezer.deepFreeze(this);
    }

    private checkData(data: D): void {
        if (data === undefined) {
            throw new Error("Data is required");
        }
    }

    private checkMetadata(metadata?: PocketMetadata<I, O>) {
    }

    /**
     * TODO: Revisit this method to use the metadata object
     */
    private async checkDataHash(data: D, metadata?: PocketMetadata<I,O>): Promise<PocketMetadata<I, O>> {
        this.checkData(data);

        const hash = await MultiHashUtilities.generateMultihash(this.dataString);
        
        if (metadata === undefined) {
            return PocketMetadata.createDefaultMetadata<I, O>({
                id: {
                    format: BaseIdentifierFormats.Multihash as I,
                    value: hash
                }
            });
        }

        if (metadata.labels.id?.format === BaseIdentifierFormats.Multihash) {
            const metadataHash = metadata.labels.id?.value;

            console.log("PocketMetadata hash: ", metadataHash);
            console.log("Data hash: ", hash);

            if (
                Checks.isEmpty(metadataHash) === false
                && metadataHash !== hash
            ) {
                throw new Error("Data hash does not match metadata hash");
            }
        }
        else {
            metadata = new PocketMetadata({
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
            throw new Error("PocketMetadata id is required");
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