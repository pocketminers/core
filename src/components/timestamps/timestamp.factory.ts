import { DateEntry } from "@templates/v0/base/timestamps";
import { TimestampItem } from "./timestamp.item";

class TimestampFactory {
    private static instance: TimestampFactory;
    
    private constructor() {}
    
    public static getInstance(): TimestampFactory {
        if (!TimestampFactory.instance) {
        TimestampFactory.instance = new TimestampFactory();
        }
        return TimestampFactory.instance;
    }
    
    public static createTimestamp(date: DateEntry = new Date()): TimestampItem {
        return new TimestampItem(date);
    }
}

export {
    TimestampFactory
}
