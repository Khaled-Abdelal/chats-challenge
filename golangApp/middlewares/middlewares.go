package middleware

import (
	"context"

	"github.com/Khaled-Abdelal/chats-challenge/golangApp/worker"
	"github.com/gin-gonic/gin"
	redis "github.com/go-redis/redis/v8"
)

type key string

const RabbitMQKey key = "rabbitMQSession"
const RedisConnectionKey key = "RedisConnection"

func AttachRabbitMQ(rabbitMQSession worker.AMPQSession) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), RabbitMQKey, rabbitMQSession)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func AttachRedis(redisConnection *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), RedisConnectionKey, redisConnection)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}
