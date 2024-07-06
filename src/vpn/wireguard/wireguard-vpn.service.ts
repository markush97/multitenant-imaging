import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { join } from 'path';
import { WgConfig } from 'wireguard-tools'
import { WireguardConfig } from './wireguar.config';
import { rm } from 'fs/promises';
import { promise as ping } from 'ping';

@Injectable()
export class VPNWireguardService implements OnModuleDestroy {
    private readonly logger = new Logger('VPNWireguardService');
    private readonly vpnConfigs: WireguardConfig[] = [];

    async onModuleDestroy() {
        // Close all Tunnels on Application Shutdown
        await Promise.all(this.vpnConfigs.map(async config => await this.disconnectTunnel(config)));
    }

    async connectTunnel(config: WireguardConfig) {
        config.connectionId = Math.floor(Math.random() * 1000).toString();
        this.logger.log(`Setting up Tunnelconnection ${config.connectionId}...`);

        const filePath = join('./', '/config', `/wg-${config.connectionId}.conf`);
        const wireguardConfig = new WgConfig({
            wgInterface: {
                address: [config.client.ip],
                privateKey: config.client.privateKey,
                name: config.connectionId
            },
            peers: [
                {
                    allowedIps: config.server.ipRanges,
                    publicKey: config.server.publicKey,
                    endpoint: config.server.host
                }
            ],
            filePath
        });

        config.connection = wireguardConfig;

        this.vpnConfigs.push(config);
        await wireguardConfig.writeToFile();
        await wireguardConfig.up()

        if (!await this.verify(config)) {
            await this.disconnectTunnel(config)
        }
    }

    async disconnectTunnel(config: WireguardConfig) {
        if (!config.connection) {
            return;
        }

        await config.connection.down();
        // delete temporary config file
        await rm(join('./', '/config', `/wg-${config.connectionId}.conf`))
        config.connection = undefined;
        config.connectionId = undefined;

    }

    async verify(config: WireguardConfig, retires = 10, delay = 1000): Promise<boolean> {
        if (config.pingTest) {
            this.logger.debug(`Pinging tunnel by using host ${config.pingTest}...`)
            const res = await ping.probe(config.pingTest);


            for (let retry = 0; retry < retires; retry++) {
                if (res.alive) {
                    this.logger.debug(`Ping suceeded with ${res.avg}ms average`)
                    return true;
                } else {
                    this.logger.warn(`Ping not successfull! Retrying ${retires - retry} more times...`);
                }

                // delay by resolving promise only after timeout
                await new Promise<boolean>((resolve) => setTimeout(resolve, delay));

            }

            return false;
        }

    }
}