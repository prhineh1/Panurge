#! /bin/bash

# cleanup any go dependencies that were installed
go mod tidy

# install vim
apt update
apt install vim procps -y

# start nginx
service nginx start

# drop symlinks for nginx logs
unlink /var/log/nginx/access.log
unlink /var/log/nginx/error.log
