import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DHCPConfigService } from './dhcp.config.service';
import { createServer } from 'dhcp';

@Injectable() 
export class DHCPService implements OnModuleInit {
    private readonly logger = new Logger('DHCPService');
    private dhcpServer;

    constructor(private readonly dhcpConfig:DHCPConfigService) {}

    async onModuleInit() {
        this.logger.log('Initializing DHCP-Server...');

        this.dhcpServer = createServer({
            range: ["192.168.69.10", "192.168.69.199"],
            forceOptions: ['hostname'], // Options that need to be sent, even if they were not requested
            randomIP: true, // Get random new IP from pool instead of keeping one ip
            static: {
                "11:22:33:44:55:66": "192.168.3.100"
            },
        })

        this.dhcpServer.listen(this.dhcpConfig.port);
    }
}


/**
 * 
 * var s = dhcp.createServer({
  // System settings
  range: [
    "192.168.3.10", "192.168.3.99"
  ],
  forceOptions: ['hostname'], // Options that need to be sent, even if they were not requested
  randomIP: true, // Get random new IP from pool instead of keeping one ip
  static: {
    "11:22:33:44:55:66": "192.168.3.100"
  },

  // Option settings (there are MUCH more)
  netmask: '255.255.255.0',
  router: [
    '192.168.0.1'
  ],
  dns: ["8.8.8.8", "8.8.4.4"],
  hostname: "kacknup",
  broadcast: '192.168.0.255',
  server: '192.168.0.1', // This is us
  bootFile: function (req, res) {

    // res.ip - the actual ip allocated for the client

    if (req.clientId === 'foo bar') {
      return 'x86linux.0';
    } else {
      return 'x64linux.0';
    }
  }
});

s.listen();
 */