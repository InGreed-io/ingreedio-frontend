FROM golang:latest

WORKDIR /app

COPY go.mod .

RUN go mod download

COPY *.go .
RUN go build -o ./mock_server

EXPOSE 8080

CMD [ "./mock_server" ]
