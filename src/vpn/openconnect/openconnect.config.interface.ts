import { WgConfig } from "wireguard-tools";
import { VPNConfig } from "../vpn.config.interface";

export interface OpenConnectConfig extends VPNConfig {
    providerConfig: {
        username: string,
        password: string,
        authGroup: string,
        vendor: 'anyconnect' | 'gp' | 'fortinet'        

    }
    connection?: WgConfig
}