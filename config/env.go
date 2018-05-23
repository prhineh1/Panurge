package config

import (
	"log"
	"text/template"

	"github.com/prhineh1/panurge/models"
)

type Environment struct {
	Db  models.Datastore
	Tpl *template.Template
}

var Env *Environment

func init() {

	db, err := models.NewDB("postgres://postgres:wanwa1Ha@localhost/panurge?sslmode=disable")
	if err != nil {
		log.Panic(err)
	}
	tpl := template.Must(template.ParseGlob("templates/*.html"))
	Env = &Environment{db, tpl}

}
