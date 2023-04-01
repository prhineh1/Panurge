#! /bin/bash

npm ci
go build -o panurge
./panurge &
npm run build:dev &