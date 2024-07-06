import { Module } from '@nestjs/common';
import { TFTPService } from './tftp.service';
import { ConfigModule } from '@nestjs/config';
import { TFTPConfigService } from './tftp.config.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [TFTPService, TFTPConfigService],
})
export class TFTPModule {}
