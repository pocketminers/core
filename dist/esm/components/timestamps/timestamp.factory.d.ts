import { DateEntry } from "../../templates/v0/base/timestamps";
import { TimestampItem } from "./timestamp.item";
declare class TimestampFactory {
    private static instance;
    private constructor();
    static getInstance(): TimestampFactory;
    static createTimestamp(date?: DateEntry): TimestampItem;
}
export { TimestampFactory };
//# sourceMappingURL=timestamp.factory.d.ts.map