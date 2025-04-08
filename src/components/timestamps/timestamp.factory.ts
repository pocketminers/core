import { BaseTimestamp } from "@templates/v0/base/timestamps";

class TimestampFactory {
    private static instance: TimestampFactory;
    
    private constructor() {}
    
    public static getInstance(): TimestampFactory {
        if (!TimestampFactory.instance) {
        TimestampFactory.instance = new TimestampFactory();
        }
        return TimestampFactory.instance;
    }
    
    public createTimestamp(): BaseTimestamp {
        return {
            date: new Date()
        }
    }
}