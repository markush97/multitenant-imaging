import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VPNOpenConnectService } from './openconnect-vpn.service';

@Module({
  imports: [],
  controllers: [],
  providers: [VPNOpenConnectService],
})
export class VPNOpenConnectModule {}
