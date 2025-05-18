"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretManager = void 0;
const process_1 = __importDefault(require("process"));
class SecretManager {
    static isReactApp() {
        try {
            const React = require('react');
            return !!React;
        }
        catch {
            return false;
        }
    }
    static getEnvironment() {
        try {
            // Check if we are in a Node.js environment
            // if (typeof process !== 'undefined' && process.versions && process.versions.node) {
            //     console.log('Node.js environment detected');
            //     return 'node';
            // }
            // if (typeof window === 'undefined'
            // ) {
            //     return 'node';
            // }
            // if (
            //     typeof window !== 'undefined'
            //     && window.location !== undefined
            //     && window.location.href !== undefined
            //     && window.location.href.includes('localhost')
            // ) {
            //     return 'development';
            // }
            // Check for a react environment
            if (SecretManager.isReactApp()) {
                console.log('React environment detected');
                return 'react';
            }
        }
        catch (error) {
            return 'node';
        }
        return 'node';
    }
    static getSecret(key, options = {}) {
        const environment = SecretManager.getEnvironment();
        if (options.inReact !== undefined
            && options.inReact === true
            || environment === 'react') {
            key = 'REACT_APP_' + key;
        }
        let secret = process_1.default.env[key];
        if (secret === undefined) {
            secret = process_1.default.env['REACT_APP_' + key];
        }
        return secret;
    }
}
exports.SecretManager = SecretManager;
//# sourceMappingURL=secret.js.map