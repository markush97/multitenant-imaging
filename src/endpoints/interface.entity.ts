import { Embeddable, Embedded, Entity, ManyToOne, Property, Unique } from "@mikro-orm/core";
import { CoreBaseEntity } from "src/core/persistence/base.entity";
import { EndpointEntity } from "./endpoint.entity";

@Entity()
export class InterfaceEntity extends CoreBaseEntity {

    @Property()
    @Unique()
    macAddress: string

    @Property()
    ipAddress: string

    @ManyToOne()
    endpoint: EndpointEntity
}