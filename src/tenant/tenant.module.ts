import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { TenantEntity } from './tenant.entity';

@Module({
    imports: [MikroOrmModule.forFeature([TenantEntity])]
})
export class TenantModule { }
