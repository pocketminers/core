/**
 * @templates/v0/base/statuses.ts
 * @description This file contains the definitions of various HTTP status codes and server statuses.
 * It includes enums for informational, success, redirection, client error, and server error codes.
 * It also includes enums for Pocket server statuses and job statuses.s
 * These enums are used to standardize the status codes and statuses used in the Pocket framework.
 */



/**
 * BaseInfoCodes is an enum that defines the common HTTP status codes for informational responses.
 * These codes are used to indicate that the request was received and understood,
 * and that the server is continuing to process the request.
 */
enum BaseInfoCodes {
    // Informational
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
enum BaseSuccessCodes {
    // Success
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
enum BaseWarningCodes {
    // Redirection
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
enum BaseClientErrorCodes {
    // Client Error
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
enum BaseServerErrorCodes {
    // Server Error
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
 * PocketServerStatuses is an enum that defines the various statuses of a Pocket server.
 * These statuses can be used to indicate the current state of the server.
 */
enum BaseServerStatuses {
    OFFLINE = 'OFFLINE',
    ONLINE = 'ONLINE',
    INITIALIZING = 'INITIALIZING',
    READY = 'READY',
    STARTING = 'STARTING',
    STOPPING = 'STOPPING',
    RESTARTING = 'RESTARTING',
    UPDATING = 'UPDATING',
    ERROR = 'ERROR'
}

/**
 * BaseServerStatus is a type that represents the keys of the BaseServerStatuses enum.
 * It is used to restrict the values to the defined statuses.
 */
type BaseServerStatus = keyof typeof BaseServerStatuses;


/**
 * BaseServerStatusCodes is an enum that defines the mapping of Pocket server statuses to HTTP status codes.
 * This mapping is used to return appropriate HTTP status codes based on the server status.
 */
enum BaseServerStatusCodes {
    OFFLINE = BaseServerErrorCodes.SERVICE_UNAVAILABLE,
    ONLINE = BaseSuccessCodes.OK,
    INITIALIZING = BaseInfoCodes.PROCESSING,
    READY = BaseSuccessCodes.OK,
    STARTING = BaseInfoCodes.PROCESSING,
    STOPPING = BaseInfoCodes.PROCESSING,
    RESTARTING = BaseInfoCodes.PROCESSING,
    UPDATING = BaseInfoCodes.PROCESSING,
    ERROR = BaseServerErrorCodes.INTERNAL_SERVER_ERROR
}

/**
 * BaseJobStatuses is an enum that defines the various statuses of a Pocket job.
 * These statuses can be used to indicate the current state of the job.
 */
enum BaseJobStatuses {
    CREATED = 'CREATED',
    QUEUED = 'QUEUED',
    RUNNING = 'RUNNING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    PAUSED = 'PAUSED',
    RESUMED = 'RESUMED',
    SKIPPED = 'SKIPPED',
    TIMEOUT = 'TIMEOUT',
    RETRYING = 'RETRYING',
    ABORTED = 'ABORTED',
    SUSPENDED = 'SUSPENDED',
    TERMINATED = 'TERMINATED',
    UNKNOWN = 'UNKNOWN'
}

/**
 * BaseJobStatus is a type that represents the keys of the BaseJobStatuses enum.
 * It is used to restrict the values to the defined job statuses.
 */
type BaseJobStatus = keyof typeof BaseJobStatuses;


/**
 * BaseJobStatusCodes is an enum that defines the mapping of Pocket job statuses to HTTP status codes.
 * This mapping is used to return appropriate HTTP status codes based on the job status.
 */
enum BaseJobStatusCodes {
    QUEUED = BaseInfoCodes.PROCESSING,
    RUNNING = BaseInfoCodes.PROCESSING,
    COMPLETED = BaseSuccessCodes.OK,
    FAILED = BaseServerErrorCodes.INTERNAL_SERVER_ERROR,
    CANCELLED = BaseClientErrorCodes.BAD_REQUEST,
    PAUSED = BaseInfoCodes.PROCESSING,
    RESUMED = BaseInfoCodes.PROCESSING,
    SKIPPED = BaseInfoCodes.PROCESSING,
    TIMEOUT = BaseServerErrorCodes.INTERNAL_SERVER_ERROR,
    RETRYING = BaseInfoCodes.PROCESSING,
    ABORTED = BaseClientErrorCodes.BAD_REQUEST,
    SUSPENDED = BaseInfoCodes.PROCESSING,
    TERMINATED = BaseClientErrorCodes.BAD_REQUEST,
    UNKNOWN = BaseServerErrorCodes.INTERNAL_SERVER_ERROR
}



export {
    BaseInfoCodes,
    BaseSuccessCodes,
    BaseWarningCodes,
    BaseClientErrorCodes,
    BaseServerErrorCodes,
    BaseServerStatuses,
    type BaseServerStatus,
    BaseServerStatusCodes,
    BaseJobStatuses,
    type BaseJobStatus,
    BaseJobStatusCodes
}