import { BaseArgument } from "../../templates/v0/index.js";
import { PocketServerManager } from "./manager.js";
declare const runServer: ({ manager, args }?: {
    manager?: PocketServerManager;
    args?: BaseArgument[];
}) => Promise<PocketServerManager>;
export { runServer };
//# sourceMappingURL=run.d.ts.map