import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule.forRoot([
    {
      name: 'auth0-oidc',
      type: 'oidc',
      jwksUri: 'https://dev-s3am0v2q.us.auth0.com/.well-known/jwks.json',
      key: 'auth0-oidc',
    }
  ]), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
