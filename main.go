package main

import (
	"log"
	"net/http"

	"github.com/prhineh1/Panurge/config"
	"github.com/prhineh1/Panurge/routes"
)

func main() {
	config.SetupEnv()
	http.Handle("/", routes.Index(config.Env))
	http.Handle("/login", routes.Login(config.Env))
	http.Handle("/register", routes.Register(config.Env))
	http.Handle("/logout", routes.Logout(config.Env))

	log.Fatal(http.ListenAndServe(":8080", nil))
}
