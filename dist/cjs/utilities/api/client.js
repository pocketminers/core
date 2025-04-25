"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApiClient = void 0;
const checks_1 = require("../checks.js");
const freezer_1 = require("../freezer.js");
const identifier_1 = require("../identifier.js");
const secret_1 = require("../secret.js");
class BaseApiClient {
    baseUrl;
    headers;
    constructor(options) {
        this.baseUrl = BaseApiClient.checkUrl(options.baseUrl);
        if (checks_1.Checks.isEmpty(options.headers)) {
            this.headers = {};
        }
        else {
            this.headers = { ...options.headers };
        }
        freezer_1.Freezer.deepFreeze(this.headers);
        freezer_1.Freezer.deepFreeze(this.baseUrl);
    }
    async fetchWithTimeout({ url, options }) {
        const timeout = options?.timeout !== undefined ? Number(options.timeout) : 5000;
        const retries = options?.retries !== undefined ? Number(options.retries) : 3;
        for (let attempt = 0; attempt < retries; attempt++) {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            const fetchOptions = {
                ...options,
                signal: controller.signal,
            };
            try {
                const response = await fetch(url, fetchOptions);
                clearTimeout(id);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}\n ${await response.text()}`);
                }
                return response;
            }
            catch (error) {
                clearTimeout(id);
                if (attempt === retries - 1) {
                    throw error;
                }
            }
        }
        throw new Error('Max retries reached');
    }
    static checkUrl(url) {
        if (!url.startsWith('http://')
            && !url.startsWith('https://')) {
            throw new Error(`Invalid URL: ${url}`);
        }
        return url;
    }
    checkPocketApiHeaders(headers) {
        let checkedHeaders = { ...this.headers, ...headers };
        if (this.headers === undefined
            || this.headers === null
            || Object.keys(this.headers).length === 0) {
            this.headers = {};
        }
        if (this.headers['x-pocket-public-api-key'] === undefined) {
            checkedHeaders['x-pocket-public-api-key'] = `txt:${secret_1.SecretManager.getSecret('POCKET_PUBLIC_API_KEY', { inReact: true })}`;
        }
        if (!this.headers['x-pocket-request-id']) {
            checkedHeaders['x-pocket-request-id'] = `txt:${identifier_1.IdentifierUtilities.generateUUIDv4()}`;
        }
        if (!this.headers['Content-Type']) {
            checkedHeaders['Content-Type'] = 'application/json';
        }
        if (!this.headers['Accept']) {
            checkedHeaders['Accept'] = 'application/json';
        }
        if (!this.headers['Accept-Encoding']) {
            checkedHeaders['Accept-Encoding'] = 'gzip, deflate, br';
        }
        if (!this.headers['User-Agent']) {
            checkedHeaders['User-Agent'] = 'PocketClient/1.0';
        }
        return checkedHeaders;
    }
    async request(endpoint, method, body, additionalHeaders) {
        const url = BaseApiClient.checkUrl(`${this.baseUrl}${endpoint}`);
        let headers = { ...this.headers, ...additionalHeaders };
        if (url.includes('pocketminers.xyz')) {
            headers = this.checkPocketApiHeaders(headers);
        }
        const response = await this.fetchWithTimeout({
            url,
            options: {
                method,
                headers,
                body: typeof body !== 'string' ? JSON.stringify(body) : body,
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API request failed');
        }
        return await response.json();
    }
    async get(endpoint, headers) {
        return await this.request(endpoint, 'GET', undefined, headers);
    }
    async post(endpoint, body, headers) {
        return await this.request(endpoint, 'POST', body, headers);
    }
    async put(endpoint, body, headers) {
        return this.request(endpoint, 'PUT', body, headers);
    }
    async delete(endpoint, headers) {
        return this.request(endpoint, 'DELETE', undefined, headers);
    }
}
exports.BaseApiClient = BaseApiClient;
//# sourceMappingURL=client.js.map