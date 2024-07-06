import { WgConfig } from "wireguard-tools";
import { VPNConfig } from "../vpn.config.interface";

export interface WireguardConfig extends VPNConfig {
    server: {
        publicKey: string;
        ipRanges: string[];
        host: string;
    };
    client: {
        privateKey: string;
        ip: string;
    };
    connection?: WgConfig
}