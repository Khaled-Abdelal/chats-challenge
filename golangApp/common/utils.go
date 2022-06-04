package common

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	env := os.Getenv("APP_ENV")
	if env == "production" {
		return
	}
	if env == "" {
		env = "development"
	}
	err := godotenv.Load(".env." + env)
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

// return server port :8000
func GetServerPort() string {
	var port string
	var ok bool
	if port, ok = os.LookupEnv("PORT"); !ok {
		port = ":8000"
	}
	return port
}
