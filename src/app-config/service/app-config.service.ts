import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) { }

    getAuthProviders(): any[]{
        return this.configService.get('AuthProviders');
    }
}
