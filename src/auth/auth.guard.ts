import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtVerificationService } from './jwt-verification.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtVerificationService: JwtVerificationService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.jwtVerificationService.verify(request).then(isVerified => {
      if (!isVerified) throw new HttpException('Unauthorized', 401);
      return true;
    });
  }
}


