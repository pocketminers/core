import { BaseArgument } from "@templates/v0";
import { PocketServerManager } from "./manager";
declare const runServer: ({ manager, args }?: {
    manager?: PocketServerManager;
    args?: BaseArgument[];
}) => Promise<PocketServerManager>;
export { runServer };
//# sourceMappingURL=run.d.ts.map