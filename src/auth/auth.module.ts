import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtVerificationService } from './jwt-verification.service';
import { AuthGuard } from './auth.guard';
import { AppConfigService } from 'src/app-config/service/app-config.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from 'src/app-config/app-config.module';

@Module({
  providers: [AuthService],
  imports: [AppConfigModule],
})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        {
          provide: JwtVerificationService,
          useFactory: (appConfigService: AppConfigService) => {
            const config = appConfigService.getAuthProviders()
            return new JwtVerificationService(config)
          },
          inject: [AppConfigService]
        },
        AuthGuard
      ],

      exports: [AuthGuard, JwtVerificationService],
    }
  }
}
