import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VPNWireguardService } from './wireguard-vpn.service';

@Module({
  imports: [],
  controllers: [],
  providers: [VPNWireguardService],
})
export class VPNWireguardModule {}
