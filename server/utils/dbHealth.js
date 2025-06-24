const mongoose = require('mongoose');

class DatabaseHealth {
    static async checkHealth() {
        try {
            const dbState = mongoose.connection.readyState;
            const stateMap = {
                0: 'disconnected',
                1: 'connected',
                2: 'connecting',
                3: 'disconnecting'
            };

            const health = {
                status: stateMap[dbState] || 'unknown',
                connected: dbState === 1,
                host: mongoose.connection.host,
                port: mongoose.connection.port,
                name: mongoose.connection.name,
                timestamp: new Date().toISOString()
            };

            if (dbState === 1) {
                // Additional checks when connected
                const startTime = Date.now();
                await mongoose.connection.db.admin().ping();
                const pingTime = Date.now() - startTime;
                
                health.ping = `${pingTime}ms`;
                health.collections = await this.getCollectionStats();
            }

            return health;
        } catch (error) {
            return {
                status: 'error',
                connected: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    static async getCollectionStats() {
        try {
            const stats = {};
            const collections = ['users', 'products', 'orders', 'categories', 'outfitpairings'];
            
            for (const collection of collections) {
                try {
                    const collectionStats = await mongoose.connection.db.collection(collection).stats();
                    stats[collection] = {
                        documents: collectionStats.count || 0,
                        size: collectionStats.size || 0,
                        indexes: collectionStats.nindexes || 0
                    };
                } catch (err) {
                    stats[collection] = { error: 'Collection not found or stats unavailable' };
                }
            }
            
            return stats;
        } catch (error) {
            return { error: error.message };
        }
    }

    static async getConnectionPoolStats() {
        try {
            const pool = mongoose.connection.db?.serverConfig;
            if (!pool) return { error: 'Pool information not available' };

            return {
                maxPoolSize: mongoose.connection.options?.maxPoolSize || 'unknown',
                minPoolSize: mongoose.connection.options?.minPoolSize || 'unknown',
                maxIdleTimeMS: mongoose.connection.options?.maxIdleTimeMS || 'unknown',
                // Add more pool metrics if available
            };
        } catch (error) {
            return { error: error.message };
        }
    }

    static async performHealthCheck() {
        const health = await this.checkHealth();
        const poolStats = await this.getConnectionPoolStats();
        
        return {
            database: health,
            connectionPool: poolStats,
            mongodb: {
                version: mongoose.version,
                driverVersion: mongoose.connection?.client?.s?.options?.driverInfo?.version || 'unknown'
            }
        };
    }
}

module.exports = DatabaseHealth; 