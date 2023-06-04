import { Module } from '@nestjs/common';
import { AppConfigService } from './service/app-config.service';
import { ConfigModule } from '@nestjs/config';
import { loadJsonConfig } from 'config/configuration';

@Module({
    imports: [ConfigModule.forRoot({
        load: [loadJsonConfig]
    })],
    providers: [AppConfigService],
    exports: [AppConfigService],
})
export class AppConfigModule { }
