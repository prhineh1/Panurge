#! /bin/bash

npm ci
go build -o panurge
npm run build:dev