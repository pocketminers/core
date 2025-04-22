/**
 * BaseMessageLevels is an enum that defines various message levels.
 * These levels can be used to categorize messages based on their severity or type.
 */
declare enum BaseMessageLevels {
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
    SUCCESS = "SUCCESS",
    DEBUG = "DEBUG",
    CRITICAL = "CRITICAL",
    TRACE = "TRACE"
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
declare const BaseMessageLevelHierarchy: Array<BaseMessageLevel>;
/**
 * BaseInfoCodes is an enum that defines the common HTTP status codes for informational responses.
 * These codes are used to indicate that the request was received and understood,
 * and that the server is continuing to process the request.
 */
declare enum BaseInfoCodes {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    EARLY_HINTS = 103
}
/**
 * BaseSuccessCodes is an enum that defines the common HTTP status codes for successful responses.
 * These codes are used to indicate that the request was successfully received, understood, and accepted.
 * The codes follow the web standard for success codes.
 * See: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
declare enum BaseSuccessCodes {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    IM_USED = 226
}
/**
 * BaseWarningCodes is an enum that defines the common HTTP status codes for redirection responses.
 * These codes are used to indicate that the client must take additional action to complete the request.
 * The codes follow the web standard for redirection codes.
 * See: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
declare enum BaseWarningCodes {
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    SWITCH_PROXY = 306,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308
}
/**
 * BaseClientErrorCodes is an enum that defines the common HTTP status codes for client error responses.
 * These codes are used to indicate that the client seems to have made an error.
 * The codes follow the web standard for client error codes.
 * See: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
declare enum BaseClientErrorCodes {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    IM_A_TEAPOT = 418,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    TOO_EARLY = 425,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451
}
/**
 * BaseServerErrorCodes is an enum that defines the common HTTP status codes for server error responses.
 * These codes are used to indicate that the server failed to fulfill a valid request.
 * The codes follow the web standard for server error codes.
 * See: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
declare enum BaseServerErrorCodes {
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511
}
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
type BaseMessageCodes = BaseInfoCodes | BaseSuccessCodes | BaseWarningCodes | BaseClientErrorCodes | BaseServerErrorCodes;
/**
 * BaseMessageCode is a type that represents the keys of the BaseMessageCodes enum.
 * It can be used to restrict values to only those defined in the enum.
 */
type BaseMessageCode = keyof typeof BaseInfoCodes | keyof typeof BaseSuccessCodes | keyof typeof BaseWarningCodes | keyof typeof BaseClientErrorCodes | keyof typeof BaseServerErrorCodes;
/**
 * BaseMessageEntry is an interface that represents a message entry.
 * It contains a code and a level, which are used to categorize the message.
 */
interface BaseMessageEntry<C extends BaseMessageCodes = BaseMessageCodes, L extends BaseMessageLevels = BaseMessageLevels.INFO, B = any, D = any> extends Record<'code', C>, Record<'level', L>, Record<'body', B>, Partial<Record<'timestamp', Date>>, Partial<Record<'data', D>> {
}
interface BaseErrorMessageEntry<C extends BaseMessageCodes = BaseSuccessCodes.OK, L extends BaseMessageLevels = BaseMessageLevels.INFO, E extends Error = any, D = any> extends Omit<BaseMessageEntry<C, L, E, D>, 'body'>, Record<'error', E> {
}
export { type BaseMessageEntry, type BaseMessageCode, type BaseMessageLevel, BaseMessageLevelHierarchy, type BaseMessageCodes, BaseInfoCodes, BaseSuccessCodes, BaseWarningCodes, BaseClientErrorCodes, BaseServerErrorCodes, BaseMessageLevels, type BaseErrorMessageEntry, };
//# sourceMappingURL=message.d.ts.map