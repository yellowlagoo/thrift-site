# Development Guide

## Setting up MongoDB Locally

This application requires MongoDB to run. Here's how to set it up:

### Install MongoDB Community Edition

#### MacOS (using Homebrew)
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0
```

#### Windows
1. Download the MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the prompts
3. Start MongoDB service from Windows Services

#### Linux (Ubuntu)
```bash
# Import the MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create a list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Reload local package database
sudo apt-get update

# Install MongoDB packages
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
```

### Verify MongoDB is Running
```bash
# Check MongoDB status
mongosh
```

You should see a MongoDB shell prompt if the connection is successful.

## Using MongoDB Atlas (Cloud) Instead

If you prefer using MongoDB Atlas instead of a local installation:

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. In "Security" > "Network Access", add your IP address or use 0.0.0.0/0 for development
4. In "Security" > "Database Access", create a new database user
5. In "Databases" > "Connect", get your connection string
6. Update the `connectionString` in `index.js` with your MongoDB Atlas URI

```javascript
// Change this line in index.js:
const connectionString = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority';
```

## Starting the Application

After setting up MongoDB:

1. Install server dependencies:
```bash
npm install
```

2. Install client dependencies:
```bash
cd client
npm install
```

3. Start both the server and client:
```bash
# From the root directory
npm run dev
```

The application should now be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000 