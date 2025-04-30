import { BaseCommands } from "./command";
import { BaseComponents } from "./component";
import { BaseParameters } from "./configuration";
import { BaseIdentifier, BaseIdentifierFormat, BaseIdentifierFormats } from "./identifier";
import { BaseErrorMessageEntry } from "./message";
import { BaseObject } from "./object";
import { BaseInstance } from "./process";
import { BaseJobStatuses } from "./statuses";



/**
 * BaseJobQueueEntry is a generic type that represents a job queue entry.
 */
interface BaseJobQueueEntry
<
    I extends BaseIdentifierFormat = BaseIdentifierFormats.UUID,
    R = unknown,
    T extends BaseInstance[] = [],

>
    extends
        BaseObject
        <
            {
                id: BaseIdentifier<I>;
                name: string;
                description: string;
                commands: BaseCommands<T>;
                parameters: BaseParameters;
                instance: T;
            },
            'UUID',
            BaseComponents.Job
        >
{}

interface BaseJobResponse
<
    R = unknown,
>
{
    result: R;
    status: BaseJobStatuses;
    error: BaseErrorMessageEntry;
}
