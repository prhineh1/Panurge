FROM golang:1.20.2
WORKDIR /Panurge
COPY . .
RUN rm -rf node_modules/