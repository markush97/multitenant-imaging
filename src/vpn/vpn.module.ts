import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VPNConfigService } from './vpn.config.service';
import { VPNWireguardModule } from './wireguard/wireguard-vpn.module';
import { VPNOpenConnectModule } from './openconnect/openconnect-vpn.module';

@Module({
  imports: [ConfigModule, VPNWireguardModule, VPNOpenConnectModule],
  controllers: [],
  providers: [VPNConfigService],
})
export class VPNModule {}
