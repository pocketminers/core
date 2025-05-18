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
export { PocketServiceCommand };
//# sourceMappingURL=command.js.map