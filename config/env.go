package config

import (
	"html/template"
	"log"

	"github.com/prhineh1/Panurge/models"
)

type Environment struct {
	Db  models.Datastore
	Tpl *template.Template
}

var Env *Environment

func SetupEnv() {

	db, err := models.NewDB("postgres://postgres:wanwa1Ha@localhost/panurge?sslmode=disable", false)
	if err != nil {
		log.Panic(err)
	}
	tpl := template.Must(template.ParseGlob("templates/*.html"))
	Env = &Environment{db, tpl}

}
