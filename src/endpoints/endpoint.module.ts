import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { EndpointEntity } from './endpoint.entity';
import { InterfaceEntity } from './interface.entity';

@Module({
    imports: [MikroOrmModule.forFeature([EndpointEntity, InterfaceEntity])]
})
export class EndpointModule { }
