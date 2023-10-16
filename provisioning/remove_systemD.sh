sudo systemctl disable frontend.service
sudo rm /etc/systemd/system/frontend.service
sudo systemctl daemon-reload