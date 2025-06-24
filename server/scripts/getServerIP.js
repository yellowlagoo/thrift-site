const https = require('https');
const http = require('http');

class IPDetector {
    static async getPublicIP() {
        const services = [
            'https://ipinfo.io/ip',
            'https://ifconfig.me/ip',
            'https://api.ipify.org',
            'https://checkip.amazonaws.com'
        ];

        for (const service of services) {
            try {
                const ip = await this.fetchIP(service);
                if (ip) return ip.trim();
            } catch (error) {
                console.log(`Failed to get IP from ${service}: ${error.message}`);
            }
        }
        throw new Error('Could not determine public IP address');
    }

    static fetchIP(url) {
        return new Promise((resolve, reject) => {
            const client = url.startsWith('https') ? https : http;
            
            const request = client.get(url, (response) => {
                let data = '';
                
                response.on('data', (chunk) => {
                    data += chunk;
                });
                
                response.on('end', () => {
                    if (response.statusCode === 200) {
                        resolve(data);
                    } else {
                        reject(new Error(`HTTP ${response.statusCode}`));
                    }
                });
            });
            
            request.on('error', reject);
            request.setTimeout(5000, () => {
                request.abort();
                reject(new Error('Request timeout'));
            });
        });
    }

    static getLocalIPs() {
        const { networkInterfaces } = require('os');
        const interfaces = networkInterfaces();
        const ips = [];

        for (const interfaceName in interfaces) {
            for (const iface of interfaces[interfaceName]) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    ips.push({
                        interface: interfaceName,
                        ip: iface.address,
                        type: 'IPv4'
                    });
                }
            }
        }
        return ips;
    }

    static async displayIPInfo() {
        try {
            console.log('🌐 Server IP Address Information');
            console.log('================================');
            
            // Get public IP
            try {
                const publicIP = await this.getPublicIP();
                console.log(`📍 Public IP Address: ${publicIP}`);
                console.log(`   Use this for MongoDB Atlas Network Access`);
                console.log('');
            } catch (error) {
                console.log(`❌ Could not get public IP: ${error.message}`);
                console.log('');
            }

            // Get local IPs
            const localIPs = this.getLocalIPs();
            if (localIPs.length > 0) {
                console.log('🏠 Local Network Addresses:');
                localIPs.forEach(({ interface: interfaceName, ip, type }) => {
                    console.log(`   ${interfaceName}: ${ip} (${type})`);
                });
                console.log('');
            }

            // Instructions
            console.log('📝 MongoDB Atlas Setup Instructions:');
            console.log('1. Go to MongoDB Atlas Dashboard');
            console.log('2. Navigate to "Network Access"');
            console.log('3. Click "Add IP Address"');
            console.log('4. Enter your Public IP Address shown above');
            console.log('5. Add a description (e.g., "Production Server")');
            console.log('6. Click "Confirm"');
            console.log('');

            // Environment variable format
            if (localIPs.length > 0) {
                console.log('🔧 For your .env file:');
                try {
                    const publicIP = await this.getPublicIP();
                    console.log(`SERVER_PUBLIC_IP=${publicIP}`);
                } catch (error) {
                    console.log('SERVER_PUBLIC_IP=your-public-ip-here');
                }
                console.log(`SERVER_LOCAL_IP=${localIPs[0].ip}`);
            }

        } catch (error) {
            console.error('Error getting IP information:', error.message);
        }
    }
}

// Run if called directly
if (require.main === module) {
    IPDetector.displayIPInfo();
}

module.exports = IPDetector; 