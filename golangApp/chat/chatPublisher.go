package chat

import (
	"encoding/json"
	"os"

	log "github.com/sirupsen/logrus"

	"github.com/Khaled-Abdelal/chats-challenge/golangApp/common"
	"github.com/streadway/amqp"
)

func PublishChatCreated(chat Chat, ampqSession common.AMPQSession) error {
	channelRabbitMQ := ampqSession.Channel

	body, err := json.Marshal(chat)
	if err != nil {
		log.Error("Error encoding JSON: ", err)
		return err
	}
	err = channelRabbitMQ.Publish("", os.Getenv("CHAT_CREATION_QUEUE"), false, false, amqp.Publishing{
		DeliveryMode: amqp.Persistent,
		ContentType:  "text/plain",
		Body:         body,
	})
	if err != nil {
		log.Error("Error %s publishing Chat %s: ", err, chat)
		return err
	}

	return nil
}
