import { Collection, Embeddable, Embedded, Entity, ManyToOne, OneToMany, Property, Unique } from "@mikro-orm/core";
import { CoreBaseEntity } from "src/core/persistence/base.entity";
import { InterfaceEntity } from "./interface.entity";
import { TenantEntity } from "src/tenant/tenant.entity";

@Entity()
export class EndpointEntity extends CoreBaseEntity {
    @OneToMany(() => InterfaceEntity, (iface: InterfaceEntity) => iface.endpoint)
    interfaces: Collection<InterfaceEntity> = new Collection(this)

    @ManyToOne()
    tenant: TenantEntity
}