# Multi-stage build
FROM node:18-alpine AS client-build

# Build client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production
COPY client/ ./
RUN npm run build

# Server stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Install server dependencies
COPY server/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy server source
COPY server/ ./

# Copy built client
COPY --from=client-build /app/client/build ./client/build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership to non-root user
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

# Start the application
CMD ["node", "server.js"] 