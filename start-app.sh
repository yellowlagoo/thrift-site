#!/bin/bash

# Set Node options for OpenSSL legacy provider
export NODE_OPTIONS='--openssl-legacy-provider'

# Start the application in development mode
echo "Starting the Clueless Outfit Picker app..."
npm run dev 