FROM golang:1.13

WORKDIR /Panurge
 
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .

RUN go build -o /panurge

CMD [ "/panurge" ]