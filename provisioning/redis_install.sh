#!/bin/bash

sudo sed -i 's/bind 127.0.0.1/bind 0.0.0.0/' /etc/redis/redis.conf

# Restart Redis
sudo systemctl restart redis-server

echo "requirepass Redis6379" | sudo tee -a /etc/redis/redis.conf

sudo systemctl restart redis-server

sudo ufw allow 6379/tcp

# Step 3: Check if Redis is running
if sudo systemctl is-active --quiet redis-server; then
  echo "Redis is running."
else
  echo "Error: Redis is not running."
  exit 1  # Exit with an error code if Redis is not running
fi