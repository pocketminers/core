import { BaseMessageCode, BaseSuccessCodes } from "@templates/v0/base/message";

interface BaseServiceResponse
<
    C = BaseMessageCode,
    D = any,
    E extends Error = Error
>
    extends
        Record<'code', C>,
        Record<'data', D>,
        Partial<Record<'error', E>>
{}


export {
    type BaseServiceResponse
}