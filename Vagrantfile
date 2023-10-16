# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

  config.vm.define "postgres_ubuntu" do |postgres_ubuntu|
    postgres_ubuntu.vm.box = "alvistack/ubuntu-22.04";

    postgres_ubuntu.vm.network "private_network", type: "static", ip: "192.168.4.252";

    # Provisions
    postgres_ubuntu.vm.provision "shell", path: "provisioning/initial_install.sh",name: "constructVM";
  end 

end
