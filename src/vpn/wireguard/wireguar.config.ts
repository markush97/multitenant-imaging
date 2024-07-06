import { WgConfig } from "wireguard-tools";

export interface WireguardConfig {
    server: {
        publicKey: string;
        ipRanges: string[];
        host: string;
    };
    client: {
        privateKey: string;
        ip: string;
    };
    pingTest?: string;
    connection?: WgConfig
    connectionId?: string;
}