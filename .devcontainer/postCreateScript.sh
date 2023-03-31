#! /bin/bash

go mod tidy
apt update
apt install vim -y
service nginx start
