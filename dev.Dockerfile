FROM nginx:latest
WORKDIR /Panurge
COPY . .
RUN rm -rf node_modules/ dist/ panurge