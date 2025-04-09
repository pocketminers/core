import { TimestampItem } from "./timestamp.item";
class TimestampFactory {
    static instance;
    constructor() { }
    static getInstance() {
        if (!TimestampFactory.instance) {
            TimestampFactory.instance = new TimestampFactory();
        }
        return TimestampFactory.instance;
    }
    static createTimestamp(date = new Date()) {
        return new TimestampItem(date);
    }
}
export { TimestampFactory };
//# sourceMappingURL=timestamp.factory.js.map