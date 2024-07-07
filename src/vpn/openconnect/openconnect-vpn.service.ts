import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { join } from 'path';
import { rm } from 'fs/promises';
import { VPNService } from '../vpn.service';
import { OpenConnectConfig } from './openconnect.config.interface';
import {checkOpenconnectIsInstalled, connect} from './lib/openconnect.helper'

@Injectable()
export class VPNOpenConnectService extends VPNService implements OnModuleInit {    
    async onModuleInit() {
        await checkOpenconnectIsInstalled();
    }
    protected readonly logger = new Logger('VPNWireguardService');

    

    override async connectTunnel(config: OpenConnectConfig) {
        config.connectionId = await super.connectTunnel(config);
        this.logger.log(`Setting up Tunnelconnection ${config.connectionId}...`);

        await connect(config.remote, config.providerConfig.username, config.providerConfig.password, config.providerConfig.authGroup, config.connectionId, config.providerConfig.vendor);

        if (!await this.verify(config)) {
            await this.disconnectTunnel(config)
        }

        return config.connectionId;
    }

    override async disconnectTunnel(config: OpenConnectConfig) {
        if (!config.connection) {
            return;
        }

        await config.connection.down();
        // delete temporary config file
        await rm(join('./', '/config', `/wg-${config.connectionId}.conf`))
        config.connection = undefined;
        config.connectionId = undefined;

    }
}