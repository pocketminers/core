"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketServiceCommand = void 0;
class PocketServiceCommand {
    name;
    description;
    args;
    options;
    defaultArgs;
    defaultOptions;
    constructor(name, description, args, options, defaultArgs, defaultOptions) {
        this.name = name;
        this.description = description;
        this.args = args;
        this.options = options;
        this.defaultArgs = defaultArgs;
        this.defaultOptions = defaultOptions;
    }
}
exports.PocketServiceCommand = PocketServiceCommand;
//# sourceMappingURL=command.js.map