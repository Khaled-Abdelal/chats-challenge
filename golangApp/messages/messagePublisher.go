package messages

import (
	"encoding/json"
	"os"

	log "github.com/sirupsen/logrus"

	"github.com/Khaled-Abdelal/chats-challenge/golangApp/common"
	"github.com/streadway/amqp"
)

func PublishMessageCreated(message Message, ampqSession common.AMPQSession) error {
	channelRabbitMQ := ampqSession.Channel

	body, err := json.Marshal(message)
	if err != nil {
		log.Error("Error encoding JSON: ", err)
		return err
	}
	err = channelRabbitMQ.Publish("", os.Getenv("MESSAGE_CREATION_QUEUE"), false, false, amqp.Publishing{
		DeliveryMode: amqp.Persistent,
		ContentType:  "text/plain",
		Body:         body,
	})
	if err != nil {
		log.Error("Error %s publishing message %s: ", err, message)
		return err
	}

	return nil
}
