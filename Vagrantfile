# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.define "backend_ubuntu" do |backend_ubuntu|
    backend_ubuntu.vm.box = "alvistack/ubuntu-22.04";

    backend_ubuntu.vm.network "private_network", type: 'static', ip: '192.168.17.220';

    config.vm.synced_folder ".", "/var/www"

    # Provisions
    backend_ubuntu.vm.provision "shell", path: "provisioning/node_install.sh",name: "startUpVM";
    backend_ubuntu.vm.provision "shell", path: "provisioning/backend_run.sh", name: "backend_startup";
  end 

end
