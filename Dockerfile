FROM node:lts
WORKDIR /build
COPY . .
RUN npm ci && npm run build:dev
COPY dist .

FROM golang:1.13

WORKDIR /Panurge
 
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .

RUN go build -o /panurge

EXPOSE 8080

COPY --from=0 /build/dist .

RUN go get -v golang.org/x/tools/gopls

CMD [ "/panurge" ]