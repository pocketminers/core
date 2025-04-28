import { BaseMessageCode } from "../../v0/base/message.js";
interface BaseServiceResponse<C = BaseMessageCode, D = any, E extends Error = Error> extends Record<'code', C>, Record<'data', D>, Partial<Record<'error', E>> {
}
export { type BaseServiceResponse };
//# sourceMappingURL=service.d.ts.map