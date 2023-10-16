#!/bin/bash

# Define the service unit file path for the backend
NOTES_SERVICE_FILE="/etc/systemd/system/notes.service"

# Define the working directory for the backend
BACKEND_DIR="/var/www"
BACKEND_START_COMMAND="npm start"

# Check if the service file already exists for the backend
if [ -f "$NOTES_SERVICE_FILE" ]; then
    echo "Service file '$NOTES_SERVICE_FILE' already exists. Exiting..."
    exit 1
fi

# Create the systemd service unit file for the backend
cat <<EOF | sudo tee "$NOTES_SERVICE_FILE" > /dev/null
[Unit]
Description=Nest.js Backend Service
RequiresMountsFor=$BACKEND_DIR
After=network.target

[Service]
WorkingDirectory=$BACKEND_DIR
ExecStart=$BACKEND_START_COMMAND  # Adjust the npm command as needed
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd to make it aware of the new service
sudo systemctl daemon-reload

# Enable and start the backend service
sudo systemctl enable notes.service
sudo systemctl start notes.service