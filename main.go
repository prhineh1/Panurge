package main

import (
	"net/http"
	"os"

	c "github.com/prhineh1/panurge/config"
	r "github.com/prhineh1/panurge/routes"
)

func main() {
	c.SetupEnv()
	p := os.Getenv("PORT")
	http.Handle("/", r.Logger(c.Env, r.Index(c.Env)))
	http.Handle("/dist/", http.StripPrefix("/dist", http.FileServer(http.Dir("./dist"))))
	http.Handle("/login", r.Logger(c.Env, r.Login(c.Env)))
	http.Handle("/register", r.Logger(c.Env, r.Register(c.Env)))
	http.Handle("/logout", r.Logger(c.Env, r.Logout(c.Env)))
	http.Handle("/game", r.Logger(c.Env, r.Game(c.Env)))
	http.Handle("/favicon.ico", http.NotFoundHandler())

	c.Env.Log.Println("Server is starting on port " + p)
	http.ListenAndServe(":"+p, nil)
}
