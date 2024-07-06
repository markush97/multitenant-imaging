import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VPNWireguardService } from './wireguard-vpn.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [VPNWireguardService],
})
export class VPNWireguardModule {}
