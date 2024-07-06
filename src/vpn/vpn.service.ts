import { Logger, OnModuleDestroy } from "@nestjs/common";
import { VPNConfig } from "./vpn.config.interface";
import { promise as ping } from 'ping';
import { VPNConfigService } from "./vpn.config.service";

export abstract class VPNService implements OnModuleDestroy {
    protected readonly logger: Logger;
    protected readonly vpnConnections: VPNConfig[] = [];

    constructor(private readonly vpnConfig: VPNConfigService) {}

    /**
     * Startup a VPN-Tunnel and register it in the vpn service
     * @param config 
     */
    abstract connectTunnel(config: VPNConfig): Promise<void>;

    /**
     * Disconnect VPN Tunnel
     * @param config 
     */
    abstract disconnectTunnel(config: VPNConfig): Promise<void>;

    /**
     * Uses a ping to verify the tunnel connection
     * @param config VPN-Config
     * @param retires How often to retry a failed ping
     * @param delay ms to wait between each ping
     * @returns result of the check
     */
    protected async verify(config: VPNConfig, retires = this.vpnConfig.defaultRetries, delay = this.vpnConfig.defaultDelay): Promise<boolean> {
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

    async onModuleDestroy() {
        // Close all Tunnels on Application Shutdown
        await Promise.all(this.vpnConnections.map(async config => await this.disconnectTunnel(config)));
    }
}