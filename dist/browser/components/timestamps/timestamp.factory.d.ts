import { DateEntry } from "../../templates/v0/base/timestamps.js";
import { TimestampItem } from "./timestamp.item.js";
declare class TimestampFactory {
    private static instance;
    private constructor();
    static getInstance(): TimestampFactory;
    static createTimestamp(date?: DateEntry): TimestampItem;
}
export { TimestampFactory };
//# sourceMappingURL=timestamp.factory.d.ts.map