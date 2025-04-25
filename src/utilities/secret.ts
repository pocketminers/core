class SecretManager {

    public static getEnvironment(): string {
        if (typeof window === 'undefined') {
            return 'node';
        }

        if (window.location.href.includes('localhost')) {
            return 'development';
        }

        if (window.location.href.includes('dev')) {
            return 'react-dev';
        }

        return 'production';
    }

    public static getSecret(key: string, options: { inReact?: boolean } = {}): string | undefined {
        const environment = this.getEnvironment();

        if (options.inReact || environment === 'react-dev') {
            key = 'REACT_APP_' + key;
        }

        const secret = process.env[key];

        if (!secret) {
            throw new Error(`Secret ${key} not found.`);
        }

        return secret;
    }
}

export {
    SecretManager
}