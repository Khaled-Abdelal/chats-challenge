package common

import (
	"os"

	redis "github.com/go-redis/redis/v8"
)

var RDB *redis.Client

func InitRedis() *redis.Client {
	rdb := redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_ADDRESS"),
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       0, // use default DB
	})
	RDB = rdb
	return rdb
}

func GetRedis() *redis.Client {
	return RDB
}
