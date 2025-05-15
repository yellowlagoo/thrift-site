@echo off
REM Set Node options for OpenSSL legacy provider
set NODE_OPTIONS=--openssl-legacy-provider

REM Start the application in development mode
echo Starting the Clueless Outfit Picker app...
npm run dev 