const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const connectionOptions = {
            // Connection pool settings for production
            maxPoolSize: 10, // Maximum number of connections in the pool
            minPoolSize: 2,  // Minimum number of connections in the pool
            maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
            serverSelectionTimeoutMS: 5000, // How long to try selecting a server
            socketTimeoutMS: 45000, // How long a send or receive on a socket can take before timing out
            connectTimeoutMS: 10000, // How long to wait for a connection to be established
            heartbeatFrequencyMS: 10000, // How often to check the server status
            
            // Buffer settings (updated for newer mongoose versions)
            bufferCommands: false, // Disable mongoose buffering
            
            // Note: useNewUrlParser and useUnifiedTopology are deprecated in MongoDB Driver 4.0+
            
            // For production with replica sets
            retryWrites: true,
            retryReads: true,
            
            // Database name (if not in connection string)
            dbName: process.env.DB_NAME || 'thrift-store'
        };

        await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
        
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
        
        // Log connection events for monitoring
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });
        
        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });
        
    } catch (err) {
        console.error(`MongoDB connection error: ${err.message}`);
        // Don't exit in production, let the app retry
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
}
    
module.exports = connectDB;