/**
 * BaseMessageLevels is an enum that defines various message levels.
 * These levels can be used to categorize messages based on their severity or type.
 */
var BaseMessageLevels;
(function (BaseMessageLevels) {
    BaseMessageLevels["INFO"] = "INFO";
    BaseMessageLevels["WARNING"] = "WARNING";
    BaseMessageLevels["ERROR"] = "ERROR";
    BaseMessageLevels["SUCCESS"] = "SUCCESS";
    BaseMessageLevels["DEBUG"] = "DEBUG";
    BaseMessageLevels["CRITICAL"] = "CRITICAL";
    BaseMessageLevels["TRACE"] = "TRACE";
})(BaseMessageLevels || (BaseMessageLevels = {}));
/**
 * BaseMessageLevelHierarchy is a type that represents the hierarchy of message levels.
 * It is used to define the order of message levels from highest to lowest.
 */
var BaseMessageLevelHierarchy = [
    BaseMessageLevels.CRITICAL,
    BaseMessageLevels.ERROR,
    BaseMessageLevels.WARNING,
    BaseMessageLevels.INFO,
    BaseMessageLevels.SUCCESS,
    BaseMessageLevels.DEBUG,
    BaseMessageLevels.TRACE
];
/**
 * BaseInfoCodes is an enum that defines the common HTTP status codes for informational responses.
 * These codes are used to indicate that the request was received and understood,
 * and that the server is continuing to process the request.
 */
var BaseInfoCodes;
(function (BaseInfoCodes) {
    // Informational
    BaseInfoCodes[BaseInfoCodes["CONTINUE"] = 100] = "CONTINUE";
    BaseInfoCodes[BaseInfoCodes["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
    BaseInfoCodes[BaseInfoCodes["PROCESSING"] = 102] = "PROCESSING";
    BaseInfoCodes[BaseInfoCodes["EARLY_HINTS"] = 103] = "EARLY_HINTS";
})(BaseInfoCodes || (BaseInfoCodes = {}));
/**
 * BaseSuccessCodes is an enum that defines the common HTTP status codes for successful responses.
 * These codes are used to indicate that the request was successfully received, understood, and accepted.
 * The codes follow the web standard for success codes.
 * See: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
var BaseSuccessCodes;
(function (BaseSuccessCodes) {
    // Success
    BaseSuccessCodes[BaseSuccessCodes["OK"] = 200] = "OK";
    BaseSuccessCodes[BaseSuccessCodes["CREATED"] = 201] = "CREATED";
    BaseSuccessCodes[BaseSuccessCodes["ACCEPTED"] = 202] = "ACCEPTED";
    BaseSuccessCodes[BaseSuccessCodes["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
    BaseSuccessCodes[BaseSuccessCodes["NO_CONTENT"] = 204] = "NO_CONTENT";
    BaseSuccessCodes[BaseSuccessCodes["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    BaseSuccessCodes[BaseSuccessCodes["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    BaseSuccessCodes[BaseSuccessCodes["MULTI_STATUS"] = 207] = "MULTI_STATUS";
    BaseSuccessCodes[BaseSuccessCodes["ALREADY_REPORTED"] = 208] = "ALREADY_REPORTED";
    BaseSuccessCodes[BaseSuccessCodes["IM_USED"] = 226] = "IM_USED";
})(BaseSuccessCodes || (BaseSuccessCodes = {}));
/**
 * BaseWarningCodes is an enum that defines the common HTTP status codes for redirection responses.
 * These codes are used to indicate that the client must take additional action to complete the request.
 * The codes follow the web standard for redirection codes.
 * See: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
var BaseWarningCodes;
(function (BaseWarningCodes) {
    // Redirection
    BaseWarningCodes[BaseWarningCodes["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    BaseWarningCodes[BaseWarningCodes["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    BaseWarningCodes[BaseWarningCodes["FOUND"] = 302] = "FOUND";
    BaseWarningCodes[BaseWarningCodes["SEE_OTHER"] = 303] = "SEE_OTHER";
    BaseWarningCodes[BaseWarningCodes["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    BaseWarningCodes[BaseWarningCodes["USE_PROXY"] = 305] = "USE_PROXY";
    BaseWarningCodes[BaseWarningCodes["SWITCH_PROXY"] = 306] = "SWITCH_PROXY";
    BaseWarningCodes[BaseWarningCodes["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
    BaseWarningCodes[BaseWarningCodes["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
})(BaseWarningCodes || (BaseWarningCodes = {}));
/**
 * BaseClientErrorCodes is an enum that defines the common HTTP status codes for client error responses.
 * These codes are used to indicate that the client seems to have made an error.
 * The codes follow the web standard for client error codes.
 * See: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
var BaseClientErrorCodes;
(function (BaseClientErrorCodes) {
    // Client Error
    BaseClientErrorCodes[BaseClientErrorCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    BaseClientErrorCodes[BaseClientErrorCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    BaseClientErrorCodes[BaseClientErrorCodes["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    BaseClientErrorCodes[BaseClientErrorCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    BaseClientErrorCodes[BaseClientErrorCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    BaseClientErrorCodes[BaseClientErrorCodes["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    BaseClientErrorCodes[BaseClientErrorCodes["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    BaseClientErrorCodes[BaseClientErrorCodes["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
    BaseClientErrorCodes[BaseClientErrorCodes["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    BaseClientErrorCodes[BaseClientErrorCodes["CONFLICT"] = 409] = "CONFLICT";
    BaseClientErrorCodes[BaseClientErrorCodes["GONE"] = 410] = "GONE";
    BaseClientErrorCodes[BaseClientErrorCodes["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    BaseClientErrorCodes[BaseClientErrorCodes["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    BaseClientErrorCodes[BaseClientErrorCodes["PAYLOAD_TOO_LARGE"] = 413] = "PAYLOAD_TOO_LARGE";
    BaseClientErrorCodes[BaseClientErrorCodes["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
    BaseClientErrorCodes[BaseClientErrorCodes["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    BaseClientErrorCodes[BaseClientErrorCodes["RANGE_NOT_SATISFIABLE"] = 416] = "RANGE_NOT_SATISFIABLE";
    BaseClientErrorCodes[BaseClientErrorCodes["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    BaseClientErrorCodes[BaseClientErrorCodes["IM_A_TEAPOT"] = 418] = "IM_A_TEAPOT";
    BaseClientErrorCodes[BaseClientErrorCodes["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
    BaseClientErrorCodes[BaseClientErrorCodes["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    BaseClientErrorCodes[BaseClientErrorCodes["LOCKED"] = 423] = "LOCKED";
    BaseClientErrorCodes[BaseClientErrorCodes["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
    BaseClientErrorCodes[BaseClientErrorCodes["TOO_EARLY"] = 425] = "TOO_EARLY";
    BaseClientErrorCodes[BaseClientErrorCodes["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
    BaseClientErrorCodes[BaseClientErrorCodes["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
    BaseClientErrorCodes[BaseClientErrorCodes["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    BaseClientErrorCodes[BaseClientErrorCodes["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
    BaseClientErrorCodes[BaseClientErrorCodes["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
})(BaseClientErrorCodes || (BaseClientErrorCodes = {}));
/**
 * BaseServerErrorCodes is an enum that defines the common HTTP status codes for server error responses.
 * These codes are used to indicate that the server failed to fulfill a valid request.
 * The codes follow the web standard for server error codes.
 * See: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
var BaseServerErrorCodes;
(function (BaseServerErrorCodes) {
    // Server Error
    BaseServerErrorCodes[BaseServerErrorCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    BaseServerErrorCodes[BaseServerErrorCodes["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    BaseServerErrorCodes[BaseServerErrorCodes["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    BaseServerErrorCodes[BaseServerErrorCodes["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    BaseServerErrorCodes[BaseServerErrorCodes["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    BaseServerErrorCodes[BaseServerErrorCodes["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    BaseServerErrorCodes[BaseServerErrorCodes["VARIANT_ALSO_NEGOTIATES"] = 506] = "VARIANT_ALSO_NEGOTIATES";
    BaseServerErrorCodes[BaseServerErrorCodes["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
    BaseServerErrorCodes[BaseServerErrorCodes["LOOP_DETECTED"] = 508] = "LOOP_DETECTED";
    BaseServerErrorCodes[BaseServerErrorCodes["NOT_EXTENDED"] = 510] = "NOT_EXTENDED";
    BaseServerErrorCodes[BaseServerErrorCodes["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
})(BaseServerErrorCodes || (BaseServerErrorCodes = {}));
export { BaseMessageLevelHierarchy, BaseInfoCodes, BaseSuccessCodes, BaseWarningCodes, BaseClientErrorCodes, BaseServerErrorCodes, BaseMessageLevels, };
//# sourceMappingURL=message.js.map