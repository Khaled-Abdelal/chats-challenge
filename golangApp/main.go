package main

import (
	"net/http"

	"github.com/Khaled-Abdelal/chats-challenge/golangApp/chat"
	"github.com/Khaled-Abdelal/chats-challenge/golangApp/common"
	"github.com/gin-gonic/gin"
)

func main() {
	common.LoadEnv()
	common.InitRabbitMQ()
	common.InitRedis()

	r := gin.Default()

	r.GET("/", ping)

	r.POST("/applications/:token/chats", chat.CreateChat)
	r.Run(common.GetServerPort()) // listen and serve
}

func ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}
