type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface ApiClientOptions {
    baseUrl: string;
    headers?: Record<string, string>;
}
declare class BaseApiClient {
    baseUrl: string;
    headers: Record<string, string>;
    constructor(options: ApiClientOptions);
    private fetchWithTimeout;
    static checkUrl(url: string): string;
    private request;
    get<T>(endpoint: string, headers?: Record<string, string>): Promise<T>;
    post<B = any, T = unknown>(endpoint: string, body: B, headers?: Record<string, string>): Promise<T>;
    put<B, T>(endpoint: string, body: B, headers?: Record<string, string>): Promise<T>;
    delete<B, T>(endpoint: string, headers?: Record<string, string>): Promise<T>;
}
export { BaseApiClient, type ApiClientOptions, type HttpMethod };
//# sourceMappingURL=client.d.ts.map