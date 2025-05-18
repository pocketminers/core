import process from 'process';
var SecretManager = /** @class */ (function () {
    function SecretManager() {
    }
    SecretManager.isReactApp = function () {
        try {
            var React = require('react');
            return !!React;
        }
        catch (_a) {
            return false;
        }
    };
    SecretManager.getEnvironment = function () {
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
    };
    SecretManager.getSecret = function (key, options) {
        if (options === void 0) { options = {}; }
        var environment = SecretManager.getEnvironment();
        if (options.inReact !== undefined
            && options.inReact === true
            || environment === 'react') {
            key = 'REACT_APP_' + key;
        }
        var secret = process.env[key];
        if (secret === undefined) {
            secret = process.env['REACT_APP_' + key];
        }
        return secret;
    };
    return SecretManager;
}());
export { SecretManager };
//# sourceMappingURL=secret.js.map