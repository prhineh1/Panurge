FROM node:lts as frontend
WORKDIR /frontend
COPY . .
RUN npm ci && npm run build
COPY dist .

FROM golang:1.20.2 as backend
WORKDIR /backend
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .
RUN cp assets/templates/*.tmpl config/
RUN go build -o /panurge

FROM nginx:1-alpine
EXPOSE 8000
COPY --from=frontend /frontend/dist /etc/nginx/static/
COPY --from=backend /backend/panurge /go/bin/
RUN /go/bin/panurge &
