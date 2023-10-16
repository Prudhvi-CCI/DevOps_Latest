# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

  config.vm.define "redis_ubuntu" do |redis_ubuntu|
    redis_ubuntu.vm.box = "alvistack/ubuntu-22.04";

    redis_ubuntu.vm.network "private_network", type: "static", ip: "192.168.33.72";

    # Provisions
    redis_ubuntu.vm.provision "shell", path: "provisioning/initial_install.sh",name: "constructVM";
    redis_ubuntu.vm.provision "shell", path: "provisioning/redis_install.sh", name: "redisSetup";
  end

end
