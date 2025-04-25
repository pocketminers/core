import { Checks } from "@utilities/checks";
import { Freezer } from "@utilities/freezer";
import { IdentifierUtilities } from "@utilities/identifier";
import { SecretManager } from "@utilities/secret";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiClientOptions {
    baseUrl: string;
    headers?: Record<string, string>;
}

class BaseApiClient {
    public baseUrl: string;
    public headers: Record<string, string>;

    constructor(options: ApiClientOptions) {
        this.baseUrl = BaseApiClient.checkUrl(options.baseUrl);

        if (Checks.isEmpty(options.headers)) {
            this.headers = {};
        }
        else {
            this.headers = { ...options.headers };
        }

        Freezer.deepFreeze(this.headers);
        Freezer.deepFreeze(this.baseUrl);
    }

    private async fetchWithTimeout({
        url,
        options
    }: {
        url: string;
        options?: Record<string, string | number | boolean | AbortSignal | RequestInit>;
    }): Promise<Response> {
        const timeout = options?.timeout !== undefined ? Number(options.timeout) : 5000;
        const retries = options?.retries !== undefined ? Number(options.retries) : 3;

        for (let attempt = 0; attempt < retries; attempt++) {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);

            const fetchOptions: RequestInit = {
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
            } catch (error) {
                clearTimeout(id);

                if (attempt === retries - 1) {
                    throw error;
                }
            }
        }
        throw new Error('Max retries reached');
    }

    public static checkUrl(url: string): string {
        if (
            !url.startsWith('http://')
            && !url.startsWith('https://'
        )) {
            throw new Error(`Invalid URL: ${url}`);
        }
        return url;
    }

    private checkPocketApiHeaders(headers?: Record<string, string>): Record<string, string> {
        let checkedHeaders = { ...this.headers, ...headers };

        if (
            this.headers === undefined
            || this.headers === null
            || Object.keys(this.headers).length === 0
        ) {
            this.headers = {};
        }

        if (this.headers['x-pocket-public-api-key'] === undefined) {
            checkedHeaders['x-pocket-public-api-key'] = `txt:${SecretManager.getSecret('POCKET_PUBLIC_API_KEY', { inReact: true })}`;
        }

        if (!this.headers['x-pocket-request-id']) {
            checkedHeaders['x-pocket-request-id'] = `txt:${IdentifierUtilities.generateUUIDv4()}`;
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

    private async request
    <
        B = undefined,
        T = unknown
    >(
        endpoint: string,
        method: HttpMethod,
        body?: B,
        additionalHeaders?: Record<string, string>
    ): Promise<T> {
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
            const error: any = await response.json();
            throw new Error(error.message || 'API request failed');
        }

        return await response.json() as T;
    }

    public async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
        return await this.request<undefined, T>(endpoint, 'GET', undefined, headers);
    }

    public async post<B = any, T = unknown>(
        endpoint: string,
        body: B,
        headers?: Record<string, string>
    ): Promise<T> {
        return await this.request<B,T>(endpoint, 'POST', body, headers);
    }

    public async put<B, T>(
        endpoint: string,
        body: B,
        headers?: Record<string, string>
    ): Promise<T> {
        return this.request<B, T>(endpoint, 'PUT', body, headers);
    }

    public async delete<B, T>(
        endpoint: string,
        headers?: Record<string, string>
    ): Promise<T> {
        return this.request<B, T>(endpoint, 'DELETE', undefined, headers);
    }
}

export {
    BaseApiClient,
    type ApiClientOptions,
    type HttpMethod
}