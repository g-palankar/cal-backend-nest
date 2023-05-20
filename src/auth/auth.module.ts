import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthProviderConfig } from './interface/auth-provider-config.interface';
import { JwtVerificationService } from './jwt-verification.service';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthService],
})
export class AuthModule {
  static forRoot(authProviderConfigs: AuthProviderConfig[]): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        { provide: JwtVerificationService, useValue: new JwtVerificationService(authProviderConfigs) },
        AuthGuard
      ],
      exports: [AuthGuard, JwtVerificationService],
    }
  }
}
