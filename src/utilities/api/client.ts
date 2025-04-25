import { Checks } from "@utilities/checks";
import { IdentifierUtilities } from "@utilities/identifier";
import { SecretManager } from "@utilities/secret";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiClientOptions {
    baseUrl: string;
    headers?: Record<string, string>;
    apiKey?: string;
}

class ApiClient {
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(options: ApiClientOptions) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers !== undefined ? options.headers : {};
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

    private checkUrl(url: string): string {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            throw new Error(`Invalid URL: ${url}`);
        }
        return url;
    }

    private checkHeaders(headers?: Record<string, string>): Record<string, string> {
        let checkedHeaders = { ...this.headers, ...headers };

        if (!this.headers['x-pocket-public-api-key']) {
            checkedHeaders['x-pocket-public-api-key'] = `txt:${SecretManager.getInstance().getSecret('POCKET_PUBLIC_API_KEY', { inReact: true })}`;
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
        const url = this.checkUrl(`${this.baseUrl}${endpoint}`);
        const headers = this.checkHeaders(additionalHeaders);

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

        return response.json();
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

export default ApiClient;