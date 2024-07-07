import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PXEModule } from './pxe/pxe.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DHCPModule } from './dhcp/dhcp.module';
import { VPNModule } from './vpn/vpn.module';
import { CoreConfigModule } from './core/config/core.config.module';
import { CorePersistenceModule } from './core/persistence/core-persistence.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [PXEModule, CoreConfigModule, DHCPModule, VPNModule, CorePersistenceModule, TenantModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: []
})
export class AppModule { }
