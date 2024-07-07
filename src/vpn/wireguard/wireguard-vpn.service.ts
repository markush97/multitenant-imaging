import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { WgConfig } from 'wireguard-tools'
import { WireguardConfig } from './wireguar.config.interface';
import { rm } from 'fs/promises';
import { VPNService } from '../vpn.service';

@Injectable()
export class VPNWireguardService extends VPNService  {
    protected readonly logger = new Logger('VPNWireguardService');

    override async connectTunnel(config: WireguardConfig) {
        config.connectionId = await super.connectTunnel(config);
        this.logger.log(`Setting up Tunnelconnection ${config.connectionId}...`);

        const filePath = join('./', '/config', `/wg-${config.connectionId}.conf`);
        const wireguardConfig = new WgConfig({
            wgInterface: {
                address: [config.providerConfig.client.ip],
                privateKey: config.providerConfig.client.privateKey,
                name: config.connectionId
            },
            peers: [
                {
                    allowedIps: config.providerConfig.server.ipRanges,
                    publicKey: config.providerConfig.server.publicKey,
                    endpoint: config.remote
                }
            ],
            filePath
        });

        config.connection = wireguardConfig;

        this.vpnConnections.push(config);
        await wireguardConfig.writeToFile();
        await wireguardConfig.up()

        if (!await this.verify(config)) {
            await this.disconnectTunnel(config)
        }
        
        return config.connectionId;
    }

    override async disconnectTunnel(config: WireguardConfig) {
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