#!/bin/bash

sudo apt-get update
sudo apt-get install -y curl

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

source ~/.nvm/nvm.sh

nvm install v18.17.1

nvm use v18.17.1

node -v

npm install -g npm@latest


