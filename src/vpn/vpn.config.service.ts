import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable() 
export class VPNConfigService {
    constructor(private readonly config: ConfigService) {
    }
    
    get defaultDelay(): number {
        return this.config.get<number>('VPN_DEFAULT_DELAY', 1000);
    }

    get defaultRetries(): number {
        return this.config.get<number>('VPN_DEFAULT_RETRIES', 10);
    }
   
}
