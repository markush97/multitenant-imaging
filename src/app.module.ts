import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PXEModule } from './pxe/pxe.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DHCPModule } from './dhcp/dhcp.module';
import { VPNModule } from './vpn/vpn.module';

@Module({
  imports: [PXEModule, ConfigModule, DHCPModule, VPNModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [ ConfigService ]
})
export class AppModule {}
