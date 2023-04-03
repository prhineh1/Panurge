FROM nginx:latest

# unlinks nginx logs from /dev/null
RUN rm /var/log/nginx/*