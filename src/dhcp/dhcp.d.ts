declare module 'dhcp' {

  export const createServer = (opts: DHCPOptions): DHCPServer => any
  export class DHCPServer {

    
  }

  export type DHCPOptions = Record<string, unknown>;

  export interface DHCPOption {
    name: string;
    type: 'UInt8' | 'IP' | 'IPs' | 'Bool' | 'UInt32' | 'ASCII'
    config?: string;
    attr?: string;
    enum?: Record<number, string>;
  }
}