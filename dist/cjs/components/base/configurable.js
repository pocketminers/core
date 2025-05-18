"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configurable = void 0;
class Configurable {
    static defaultOptions = {};
    configuration;
    constructor(configuration = {}, prototype = Configurable.prototype) {
        this.configuration = {
            ...Configurable.defaultOptions,
            ...configuration
        };
        this.initializeConfigurable(prototype);
    }
    initializeConfigurable(overridePrototype) {
        if (overridePrototype === undefined) {
            overridePrototype = Object.getPrototypeOf(this);
        }
        Object.setPrototypeOf(this, overridePrototype);
    }
    addOption(key, value) {
        this.configuration[key] = value;
        return this;
    }
    getOption(key) {
        return this.configuration[key];
    }
    getOptions() {
        return this.configuration;
    }
    setOptions(options) {
        this.configuration = {
            ...this.configuration,
            ...options
        };
        return this;
    }
    removeOption(key) {
        delete this.configuration[key];
        return this;
    }
    hasOption(key) {
        return this.configuration.hasOwnProperty(key);
    }
    clearOptions() {
        this.configuration = {};
        return this;
    }
    isEmpty() {
        return Object.keys(this.configuration).length === 0;
    }
    toJSON() {
        return JSON.stringify(this.configuration);
    }
    toString() {
        return JSON.stringify(this.configuration, null, 2);
    }
    static fromJSON(json) {
        return new Configurable(JSON.parse(json));
    }
    static fromString(str) {
        return new Configurable(JSON.parse(str));
    }
    static fromRecords(records) {
        const options = {};
        for (const record of records) {
            for (const key in record) {
                options[key] = record[key];
            }
        }
        return new Configurable(options);
    }
}
exports.Configurable = Configurable;
//# sourceMappingURL=configurable.js.map