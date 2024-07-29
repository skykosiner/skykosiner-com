FROM golang:1.20

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

RUN go build -o /app/main /app/cmd/main.go

EXPOSE 8080
CMD ["/app/main"]
