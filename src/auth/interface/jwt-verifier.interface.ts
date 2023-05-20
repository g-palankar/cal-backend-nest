export interface JwtVerifier {
    verifyToken(token: string): Promise<boolean>
}