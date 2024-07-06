import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable() 
export class VPNConfigService {
    constructor(private readonly config: ConfigService) {
    }
    
   
}
