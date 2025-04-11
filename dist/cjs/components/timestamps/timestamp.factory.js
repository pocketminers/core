"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampFactory = void 0;
const timestamp_item_1 = require("./timestamp.item.js");
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
        return new timestamp_item_1.TimestampItem(date);
    }
}
exports.TimestampFactory = TimestampFactory;
//# sourceMappingURL=timestamp.factory.js.map