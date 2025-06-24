# Environment Variables Template for Production

Create a `.env` file in the `server/` directory with these variables:

```bash
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thrift-store?retryWrites=true&w=majority
DB_NAME=thrift-store

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-256-bits-change-in-production
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=change-this-strong-password

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Configuration
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting Configuration
GENERAL_RATE_LIMIT_WINDOW_MS=900000
GENERAL_RATE_LIMIT_MAX=100
AUTH_RATE_LIMIT_WINDOW_MS=3600000
AUTH_RATE_LIMIT_MAX=5
ADMIN_RATE_LIMIT_WINDOW_MS=86400000
ADMIN_RATE_LIMIT_MAX=50

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# MongoDB Atlas Specific (if using Atlas)
ATLAS_USER=your-atlas-username
ATLAS_PASSWORD=your-atlas-password
ATLAS_CLUSTER=your-cluster-name

# Database Connection Pool Settings (optional - defaults are set in db.js)
# DB_MAX_POOL_SIZE=10
# DB_MIN_POOL_SIZE=2
# DB_MAX_IDLE_TIME_MS=30000
# DB_SERVER_SELECTION_TIMEOUT_MS=5000

# Security Settings
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret-for-future-use

# Monitoring and Logging
# SENTRY_DSN=your-sentry-dsn-for-error-tracking
# LOG_LEVEL=info
```

## MongoDB Atlas Setup Instructions

1. **Create MongoDB Atlas Account**
   - Go to https://cloud.mongodb.com
   - Create account and new project

2. **Create Cluster**
   - Choose shared cluster (free tier) or dedicated
   - Select region closest to your server location
   - Choose cluster tier based on your needs

3. **Configure Database Access**
   - Create database user with read/write permissions
   - Use strong password for database user

4. **Configure Network Access**
   - Add your application server's IP address
   - For development: add your current IP
   - For production: add server/cloud provider IPs

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<dbname>`

6. **Security Best Practices**
   - Enable authentication
   - Use IP whitelisting
   - Enable encryption at rest
   - Regular backup schedule
   - Monitor database performance

## Example MongoDB Atlas Connection String
```
mongodb+srv://myuser:mypassword@mycluster.abc123.mongodb.net/thrift-store?retryWrites=true&w=majority
``` 