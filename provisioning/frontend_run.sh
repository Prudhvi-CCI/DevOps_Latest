#!/bin/bash

# Define the service unit file path for the backend
NOTES_SERVICE_FILE="/etc/systemd/system/frontend.service"

# Define the working directory for the frontend
FRONTEND_DIR="/var/www"
FRONTEND_START_COMMAND="npm start"

# Check if the service file already exists for the backend
if [ -f "$NOTES_SERVICE_FILE" ]; then
    echo "Service file '$NOTES_SERVICE_FILE' already exists. Exiting..."
    exit 1
fi

# Create the systemd service unit file for the backend
cat <<EOF | sudo tee "$NOTES_SERVICE_FILE" > /dev/null
[Unit]
Description=React.js Frontend Service
RequiresMountsFor=$FRONTEND_DIR
After=network.target

[Service]
WorkingDirectory=$FRONTEND_DIR
ExecStart=$FRONTEND_START_COMMAND  # Adjust the npm command as needed
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd to make it aware of the new service
sudo systemctl daemon-reload

# Enable and start the backend service
sudo systemctl enable frontend.service
sudo systemctl start frontend.service