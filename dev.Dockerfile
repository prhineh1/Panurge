FROM nginx:latest
COPY . .
RUN rm -rf node_modules/ dist/ panurge