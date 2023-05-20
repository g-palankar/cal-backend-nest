import { JwksClient } from "jwks-rsa"
import { verify, JwtHeader, SigningKeyCallback, decode } from "jsonwebtoken"
import { JwtVerifier } from "./interface/jwt-verifier.interface";

export class OidcJwtVerifier implements JwtVerifier {
    private jwksClient: JwksClient

    constructor(
        jwksUri: string,
    ) {
        this.jwksClient = new JwksClient({
            jwksUri,
            cache: true,
            cacheMaxEntries: 5,
            cacheMaxAge: 1000 * 60 * 60,
        })
    }

    async getKey(header: JwtHeader, callback: SigningKeyCallback) {
        const key = await this.jwksClient.getSigningKey(header.kid);
        callback(null, key.getPublicKey());
    }

    verifyToken(token: string) {
        return new Promise<boolean>((resolve, rej) => {
            verify(token, this.getKey.bind(this), {}, (err, decoded) => {
                if (err) resolve(false)
                else resolve(true)
            })
        })
    }

}