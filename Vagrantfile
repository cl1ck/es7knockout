VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 80, host: 8080, auto_correct: true
  config.vm.network "forwarded_port", guest: 3000, host: 3000, auto_correct: true
  config.vm.network "forwarded_port", guest: 3001, host: 3001, auto_correct: true
  config.vm.network "forwarded_port", guest: 3500, host: 3500, auto_correct: true

  config.vm.provision :ansible do |ansible|
    ansible.playbook = ".ansible/playbook.yml"
  end
end
