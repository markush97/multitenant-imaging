import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DHCPConfigService } from './dhcp.config.service';
import { DHCPService } from './dhcp.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [DHCPService, DHCPConfigService],
})
export class DHCPModule {}
