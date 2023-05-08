import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import jwksRsa from 'jwks-rsa';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(){
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
      issuer: 'https://dev-s3am0v2q.us.auth0.com',
      audience: 'http://localhost:8000',
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        jwksUri: 'https://dev-s3am0v2q.us.auth0.com/.well-known/jwks.json',
        cache: true,
        cacheMaxEntries: 5,
        cacheMaxAge: 36000000
      })
    };
    
    super(options)
  }

  validate(jwtPayload: any){
    console.log('jwt payload -- ', jwtPayload);
    return {
      'test_filed': 'ganesh palankar',
      ...jwtPayload
    }
  }
  
}
