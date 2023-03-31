#! /bin/bash

code --extension golang.go --reload-window
npm ci
go build -o panurge
./panurge