import { PocketMessage } from "@components/message";
import { BaseMessageCodes, BaseMessageLevel, BaseMessageLevels, BaseSuccessCodes } from "@templates/v0";

class PocketServiceResponse
<
    C extends BaseMessageCodes = BaseSuccessCodes.OK,
    L extends BaseMessageLevel = BaseMessageLevels.INFO,
    D = any,
    E extends Error | undefined = undefined
>
    extends
        PocketMessage<C, L, D>{}