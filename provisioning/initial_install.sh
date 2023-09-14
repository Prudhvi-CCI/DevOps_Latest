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



# Present Code
# # Update the package list
# sudo apt-get update

# # Install Node.js and npm
# sudo apt-get install -y nodejs npm

# # Navigate to your project directory
# cd /var/www/

# # Delete the existing node_modules directory
# rm -rf node_modules

# # Reinstall project dependencies
# npm install

# # Start your Node.js application
# npm start


# OLD PROVISION
# # Update the package list
# sudo apt-get update

# # Install Node.js and npm
# sudo apt-get install -y nodejs npm

# # Navigate to your existing React app directory
# cd /var/www/

# # Install react and react-dom using npm
# npm install react react-dom

# # Start the React app using npm
# npm start

