declare class SecretManager {
    static isReactApp(): boolean;
    static getEnvironment(): string;
    static getSecret(key: string, options?: {
        inReact?: boolean;
    }): string | undefined;
}
export { SecretManager };
//# sourceMappingURL=secret.d.ts.map