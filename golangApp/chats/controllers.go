package chats

import (
	"net/http"

	"github.com/Khaled-Abdelal/chats-challenge/golangApp/common"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func CreateChat(ctx *gin.Context) {
	rabbitMQSession := common.GetRabbitMQSession()
	rdb := common.GetRedis()

	applicationToken := ctx.Param("token")
	inc := rdb.Incr(ctx, applicationToken) // if the key doesn't exist the consumer will discard the job
	err := inc.Err()
	if err != nil {
		log.Error("Error with Redis!: ", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server Error",
		})
		return
	}
	c := NewChat(applicationToken, int(inc.Val()))
	PublishChatCreated(c, rabbitMQSession)

	ctx.JSON(http.StatusCreated, gin.H{
		"message": "creating",
	})
}
