package messages

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/Khaled-Abdelal/chats-challenge/golangApp/common"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

type CreateMessageRequestBody struct {
	Content string `json:"content"`
}

func CreateMessage(ctx *gin.Context) {
	rabbitMQSession := common.GetRabbitMQSession()
	rdb := common.GetRedis()

	applicationToken := ctx.Param("token")
	var rBody CreateMessageRequestBody
	if err := ctx.BindJSON(&rBody); err != nil {
		log.Error("Request Body is invalid: ", err)
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Request Body is invalid",
		})
		return
	}
	chatNumber, err := strconv.Atoi(ctx.Param("number"))
	if err != nil {
		log.Error("chat Number must be a valid number: ", err)
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "chat Number must be a valid number",
		})
		return
	}
	redisKey := fmt.Sprintf("%s_%d", applicationToken, chatNumber)
	inc := rdb.Incr(ctx, redisKey) // if the key doesn't exist the consumer will discard the job
	err = inc.Err()
	if err != nil {
		log.Error("Error with Redis!: ", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server Error",
		})
		return
	}
	m := NewMessage(applicationToken, chatNumber, int(inc.Val()), rBody.Content)
	PublishMessageCreated(m, rabbitMQSession)

	ctx.JSON(http.StatusCreated, gin.H{
		"message": "creating",
	})
}
