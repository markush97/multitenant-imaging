import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VPNConfigService } from './vpn.config.service';
import { VPNWireguardModule } from './wireguard/wireguard-vpn.module';

@Module({
  imports: [ConfigModule, VPNWireguardModule],
  controllers: [],
  providers: [VPNConfigService],
})
export class VPNModule {}
