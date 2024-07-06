import { Module } from '@nestjs/common';
import { TFTPModule } from './tftp/tftp.module';

@Module({
  imports: [TFTPModule],
  controllers: [],
  providers: [],
})
export class PXEModule {}
