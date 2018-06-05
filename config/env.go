package config

import (
	"html/template"
	"log"
	"os"

	"github.com/prhineh1/Panurge/models"
)

type Environment struct {
	Db  models.Datastore
	Tpl *template.Template
	Log *log.Logger
}

var Env *Environment

func SetupEnv() {
	db, err := models.NewDB("postgres://postgres:"+os.Getenv("POSTGRES_PS")+"@localhost/panurge?sslmode=disable", false)
	if err != nil {
		log.Panic(err)
	}
	tpl := template.Must(template.ParseGlob("templates/*.html"))
	log := log.New(os.Stdout, "http: ", log.LstdFlags)
	Env = &Environment{db, tpl, log}

}
