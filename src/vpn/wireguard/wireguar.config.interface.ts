import { WgConfig } from "wireguard-tools";
import { VPNConfig } from "../vpn.config.interface";

export interface WireguardConfig extends VPNConfig {
    providerConfig: {
        server: {
            publicKey: string;
            ipRanges: string[];
        },
        client: {
            privateKey: string;
            ip: string;
        }
    }
    remote: string;
    connection?: WgConfig
}