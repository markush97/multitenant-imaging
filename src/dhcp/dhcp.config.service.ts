import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable() 
export class DHCPConfigService {
    constructor(private readonly config: ConfigService) {
    }

    public get port(): number {
        return this.config.get<number>('DHCP_PORT', 6767);
    }
    


}
