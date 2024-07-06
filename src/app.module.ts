import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PXEModule } from './pxe/pxe.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [PXEModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [ ConfigService ]
})
export class AppModule {}
