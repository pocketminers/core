import { 
    BaseClientErrorCodes, 
    BaseInfoCodes, 
    BaseServerErrorCodes, 
    BaseServerStatusCodes, 
    BaseSuccessCodes, 
    BaseWarningCodes 
} from "@templates/v0/base/statuses";


/**
 * BaseMessageLevels is an enum that defines various message levels.
 * These levels can be used to categorize messages based on their severity or type.
 */
enum BaseMessageLevels {
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    DEBUG = 'DEBUG',
    CRITICAL = 'CRITICAL',
    TRACE = 'TRACE'
}


/**
 * BaseMessageLevel is a type that represents the keys of the BaseMessageLevels enum.
 * It can be used to restrict values to only those defined in the enum.
 */
type BaseMessageLevel = keyof typeof BaseMessageLevels;


/**
 * BaseMessageLevelHierarchy is a type that represents the hierarchy of message levels.
 * It is used to define the order of message levels from highest to lowest.
 */
const BaseMessageLevelHierarchy: Array<BaseMessageLevel> = [
    BaseMessageLevels.CRITICAL,
    BaseMessageLevels.ERROR,
    BaseMessageLevels.WARNING,
    BaseMessageLevels.INFO,
    BaseMessageLevels.SUCCESS,
    BaseMessageLevels.DEBUG,
    BaseMessageLevels.TRACE
];


/**
 * BaseMessageCodes is an enum that defines various message codes.
 * These codes can be used to categorize messages based on their specific type or purpose.
 * The codes follow the web standard for error codes.
 * See: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 * --> these are not all the codes, just the most common ones
 * and the ones that are used in the Pocket Network.
 * The codes are grouped by their first digit:
 * - 1xx: Informational
 * - 2xx: Success
 * - 3xx: Redirection
 * - 4xx: Client Error
 * - 5xx: Server Error
 */
type BaseMessageCodes =
    | BaseInfoCodes
    | BaseSuccessCodes
    | BaseWarningCodes
    | BaseClientErrorCodes
    | BaseServerErrorCodes

/**
 * BaseMessageCode is a type that represents the keys of the BaseMessageCodes enum.
 * It can be used to restrict values to only those defined in the enum.
 */
type BaseMessageCode = 
    | keyof typeof BaseInfoCodes
    | keyof typeof BaseSuccessCodes
    | keyof typeof BaseWarningCodes
    | keyof typeof BaseClientErrorCodes
    | keyof typeof BaseServerErrorCodes
    | keyof typeof BaseServerStatusCodes;

/**
 * BaseMessageEntry is an interface that represents a message entry.
 * It contains a code and a level, which are used to categorize the message.
 */
interface BaseMessageEntry
<
    C extends BaseMessageCodes = BaseMessageCodes,
    L extends BaseMessageLevels = BaseMessageLevels.INFO,
    B = any,
    D = any,
>
    extends
        Record<'code', C>,
        Record<'level', L>,
        Record<'body', B>,
        Partial<Record<'timestamp', Date>>,
        Partial<Record<'data', D>>
{}

/**
 * BaseErrorMessageEntry is an interface that extends the BaseMessageEntry interface.
 * It adds an error property, which is used to store an error object.
 */
interface BaseErrorMessageEntry
<
    C extends BaseMessageCodes = BaseSuccessCodes.OK,
    L extends BaseMessageLevels = BaseMessageLevels.INFO,
    E extends Error = any,
    D = any,
> 
    extends
        Omit<BaseMessageEntry<C, L, E, D>, 'body'>,
        Record<'error', E>
{}


export {
    type BaseMessageEntry,
    type BaseErrorMessageEntry,
    type BaseMessageCode,
    type BaseMessageCodes,
    type BaseMessageLevel,
    BaseMessageLevelHierarchy,
    BaseMessageLevels
}