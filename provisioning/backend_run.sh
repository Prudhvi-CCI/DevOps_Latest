#!/bin/bash

# Define the service unit file path for the backend
NOTES_SERVICE_FILE="/etc/systemd/system/notes.service"

# Determine the current username using whoami
USERNAME=$(whoami)

echo $USERNAME "HE IS THE ONE"

# # Path to npm
# NPMPATH=$(which npm)

# echo "$NPMPATH => check out..."

# echo "$USERNAME"

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

# Check the status of the backend service
SERVICE_STATUS=$(sudo systemctl is-active notes.service)

echo $SERVICE_STATUS "status"

# SERVICE_STATUS=$(sudo systemctl status notes.service)

if [ "$SERVICE_STATUS" == "active" ]; then
    echo "Backend service is now active and running."
else
    echo "Failed to start backend service. Please check the configuration and try again."
fi


# #!/bin/bash

# # Define the service unit file path for the backend
# BACKEND_SERVICE_FILE="/etc/systemd/system/backend.service"


# User=vagrant  # Replace with the username that should run the service
# Group=vagrant


# # Determine the current username using whoami
# USERNAME=$(whoami)

# # Path to npm
# NPMPATH=which npm

# echo $NPMPATH "=>check out..."

# echo $USERNAME

# # Define the working directory for the backend
# BACKEND_DIR="/var/www/notes/"
# BACKEND_START_COMMAND="npm start"

# # Check if the service file already exists for the backend
# if [ -f "$BACKEND_SERVICE_FILE" ]; then
#     echo "Service file '$BACKEND_SERVICE_FILE' already exists. Exiting..."
#     exit 1
# fi

# # Create the systemd service unit file for the backend
# cat <<EOF | sudo tee "$BACKEND_SERVICE_FILE" > /dev/null
# [Unit]
# Description=Backend Service
# After=network.target

# [Service]
# User=$USERNAME
# WorkingDirectory=$BACKEND_DIR
# ExecStart=/usr/share/nodejs/npm/$BACKEND_START_COMMAND
# Restart=always

# [Install]
# WantedBy=multi-user.target
# EOF

# # Reload systemd to make it aware of the new service
# sudo systemctl daemon-reload

# # Enable and start the backend service
# sudo systemctl enable backend.service
# sudo systemctl start backend.service

# # Check the status of the backend service
# while true; do
#     SERVICE_STATUS=$(sudo systemctl is-active backend.service)
#     if [ "$SERVICE_STATUS" == "active" ]; then
#         echo "Service is now active."
#         break  # Exit the loop when the service is active
#     elif [ "$SERVICE_STATUS" == "failed" ]; then
#         echo "Service failed to start."
#         break  # Exit the loop if the service fails to start
#     else
#         echo "Service is still activating..."
#         sleep 5  # Wait for a few seconds before checking again
#     fi
# done

# if [ "$SERVICE_STATUS" == "active" ]; then
#     echo "Backend service is now active and running."
# else
#     echo "Failed to start backend service. Please check the configuration and try again."
# fi
