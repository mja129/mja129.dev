echo '- CREATING CONFIG FILES...'
sudo cp /usr/local/etc/ssh/ssh_config.example /usr/local/etc/ssh/ssh_config
sudo cp /usr/local/etc/ssh/sshd_config.example /usr/local/etc/ssh/sshd_config

echo '- STARTING SSH SERVICE...'
sudo /usr/local/etc/init.d/openssh start

echo '- MAKING DIRECTORIES PERSISTENT...'
sudo echo 'usr/local/etc/ssh' >> /opt/.filetool.lst
sudo echo 'etc/shadow' >> /opt/.filetool.lst
sudo echo 'etc/passwd' >> /opt/.filetool.lst

echo '- ADDING STARTUP COMMAND...'
sudo echo '/usr/local/etc/init.d/openssh start &' >> /opt/bootlocal.sh

echo '- SET TC PASSWORD TO "password123"'
sudo su root -c "echo 'root:*:13525:0:99999:7:::
lp:*:13510:0:99999:7:::
nobody:*:13509:0:99999:7:::
tc:\$1\$g5O4p9cK\$5AGNGDO1NiQtzo5jHn.oO/:19500:0:99999:7:::
' > /etc/shadow"

echo '- BACKUP FILETOOLS'
filetool.sh -b

echo 'RESTARTING'
sudo reboot
