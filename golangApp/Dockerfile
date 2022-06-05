FROM golang:1.16-alpine

ARG PORT=8000

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .
RUN go build -o /golangApp

EXPOSE ${PORT}
