import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './jwt-strategy.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthService, JwtStrategyService]
})
export class AuthModule {}
