import { TimestampItem } from "./timestamp.item.js";
var TimestampFactory = /** @class */ (function () {
    function TimestampFactory() {
    }
    TimestampFactory.getInstance = function () {
        if (!TimestampFactory.instance) {
            TimestampFactory.instance = new TimestampFactory();
        }
        return TimestampFactory.instance;
    };
    TimestampFactory.createTimestamp = function (date) {
        if (date === void 0) { date = new Date(); }
        return new TimestampItem(date);
    };
    return TimestampFactory;
}());
export { TimestampFactory };
//# sourceMappingURL=timestamp.factory.js.map