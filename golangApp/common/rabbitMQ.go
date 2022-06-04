package common

import (
	"os"

	"github.com/isayme/go-amqp-reconnect/rabbitmq"
)

// ampqSession composes an rabbitmq.Connection with an rabbitmq.Channel
type AMPQSession struct {
	*rabbitmq.Connection
	*rabbitmq.Channel
}

var RabbitSession AMPQSession

func InitRabbitMQ() AMPQSession {
	connection := connect(os.Getenv("RABBIT_MQ_CONNECTION_STRING"))
	channelRabbitMQ, err := connection.Channel()
	if err != nil {
		panic(err)
	}
	RabbitSession = AMPQSession{Connection: connection, Channel: channelRabbitMQ}
	return RabbitSession
}

func GetRabbitMQSession() AMPQSession {
	connection := connect(os.Getenv("RABBIT_MQ_CONNECTION_STRING"))
	channelRabbitMQ, err := connection.Channel()
	if err != nil {
		panic(err)
	}
	session := AMPQSession{Connection: connection, Channel: channelRabbitMQ}
	return session
}

func connect(url string) *rabbitmq.Connection {
	connectRabbitMQ, err := rabbitmq.Dial(url)
	if err != nil {
		panic(err)
	}
	channelRabbitMQ, err := connectRabbitMQ.Channel()
	if err != nil {
		panic(err)
	}
	createQueues(channelRabbitMQ)
	return connectRabbitMQ
}

func createQueues(channel *rabbitmq.Channel) error {
	defer channel.Close()
	_, err := channel.QueueDeclare(
		os.Getenv("CHAT_CREATION_QUEUE"), // queue name
		true,                             // durable
		false,                            // auto delete
		false,                            // exclusive
		false,                            // no wait
		nil,                              // arguments
	)
	if err != nil {
		panic(err)
	}

	return nil
}
