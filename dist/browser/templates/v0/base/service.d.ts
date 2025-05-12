import { BaseMessageCodes } from "@templates/v0/base/message";
import { BaseSuccessCodes } from "./statuses";
/**
 * BaseServiceResponse is an interface that represents a generic service response.
 * It contains a code, data, and an optional error property.
 *
 * @template C - The type of the code. It defaults to BaseMessageCode.
 * @template D - The type of the data. It defaults to any.
 * @template E - The type of the error. It defaults to Error.
 */
interface BaseServiceResponse<C extends BaseMessageCodes = BaseSuccessCodes.OK, D = any, E extends Error | undefined = undefined> extends Partial<Record<'code', C>>, Record<'data', D>, Partial<Record<'error', E>> {
}
export { type BaseServiceResponse };
//# sourceMappingURL=service.d.ts.map