import { WgConfig } from "wireguard-tools";

export interface VPNConfig {
    providerConfig?: object;
    pingTest?: string;
    connection?: WgConfig
    connectionId?: string;
    remote: string;
}