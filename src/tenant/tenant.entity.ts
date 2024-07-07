import { Entity, Property, Unique } from "@mikro-orm/core";
import { CoreBaseEntity } from "src/core/persistence/base.entity";

@Entity()
export class TenantEntity extends CoreBaseEntity {
   
    @Unique()
    @Property()
    public readonly abreviation: string;
}