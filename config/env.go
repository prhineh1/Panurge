package config

import (
	"html/template"
	"log"
	"os"

	"github.com/prhineh1/panurge/models"
)

type Environment struct {
	Db  models.Datastore
	Tpl *template.Template
	Log *log.Logger
}

var Env *Environment

func SetupEnv() {
	db, err := models.NewDB("postgres://postgres:postgres@db:5432?sslmode=disable", "redis://redis:6379", false)
	if err != nil {
		log.Panic(err)
	}
	tpl := template.Must(template.ParseGlob("assets/templates/*.html"))
	log := log.New(os.Stdout, "http: ", log.LstdFlags)
	Env = &Environment{db, tpl, log}

}
