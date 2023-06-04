import { Injectable } from '@nestjs/common';
import { AuthProviderConfig } from '../app-config/interface/auth-provider-config.interface';
import { JwtVerifier } from './interface/jwt-verifier.interface';
import { OidcJwtVerifier } from './oidc-jwt-verifier';
import { Request } from 'express';

@Injectable()
export class JwtVerificationService {
    private verfiers = new Map<string, JwtVerifier>();

    constructor(
        authProviderConfigs: AuthProviderConfig[]
    ) {
        authProviderConfigs.forEach(config => {
            switch (config.type) {
                case 'oidc': this.verfiers.set(config.name, new OidcJwtVerifier(config.jwksUri));
            }
        });
    }

    async verify(request: Request): Promise<boolean> {
        const token = this.extractTokenFromHeader(request);
        const authType = this.extractHeaderType(request);
        if (!token || !authType) return false;
        const verifier = this.getVerifier(authType);
        try {
            const isVerified = await verifier.verifyToken(token);
            return isVerified
        } catch (error) {
            return false;
        }
    }

    private getVerifier(authType: string): JwtVerifier {
        const verifier = this.verfiers.get(authType);
        if (!verifier) throw new Error(`No verifier found for auth type ${authType}`)
        return this.verfiers.get(authType);
    }

    //extract header type from request
    private extractHeaderType(request: any): string {
        const authHeader = request.headers['auth-type'];
        if (authHeader) {
            const type = authHeader.split(' ')[0];
            return type;
        }
        return null;
    }


    extractTokenFromHeader(request: any): string {
        const authHeader = request.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            return token;
        }
        return null;
    }
}
