import { PocketStorage } from '@components/base';
import { Identity } from '@components/index';
import { BaseIdentifierType, BaseObjectTypes, BaseStorageLocation, BaseStorageLocations } from '@templates/v0';


class Identifiers
<
    I extends BaseIdentifierType,
    L extends BaseStorageLocation
>
    extends
        PocketStorage
        <
            Identity,
            L
        >
{
    constructor({
        items = [],
        location,
        allowDuplicates = false,
        allowEmpty = true,
        maxSize = 0
    }: {
        items?: Array<Identity>;
        location?: L;
        allowDuplicates?: boolean;
        allowEmpty?: boolean;
        maxSize?: number;
    } = {}) {
        super(
            items,
            {
                location,
                allowDuplicates,
                allowEmpty,
                maxSize
            }
        );
    }
}