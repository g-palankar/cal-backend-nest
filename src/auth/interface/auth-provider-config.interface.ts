
export interface AuthProviderConfig {
    name: string;
    key: string;
    secret?: string;
    jwksUri?: string;
    type: 'oidc';
}
