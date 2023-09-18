#!/bin/bash

echo "Packages & Starters getting started..."
# Add your provisioning commands here

# Install curl (if not already installed)
sudo apt-get update
sudo apt-get install -y curl

# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load nvm into the current shell session
source ~/.nvm/nvm.sh

# Install the latest LTS version of Node.js and npm
nvm install --lts

# Set the newly installed Node.js version as the default
nvm alias default $(nvm current)

# Verify Node.js and npm versions
node -v
npm -v

# Navigate to your project directory
cd /var/www/

# Delete the existing node_modules directory
# rm -rf node_modules

# Reinstall project dependencies
npm install react react-dom

# Start your Node.js application
npm start