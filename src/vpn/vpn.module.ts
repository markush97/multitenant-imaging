import { Module } from '@nestjs/common';
import { VPNConfigService } from './vpn.config.service';
import { VPNWireguardModule } from './wireguard/wireguard-vpn.module';
import { VPNOpenConnectModule } from './openconnect/openconnect-vpn.module';

@Module({
  imports: [VPNWireguardModule, VPNOpenConnectModule],
  controllers: [],
  providers: [VPNConfigService],
})
export class VPNModule {}
