package config

import (
	"embed"
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

//go:embed *.tmpl
var tmpls embed.FS

var Env *Environment

func SetupEnv() {
	var tpl *template.Template

	log.Println(tmpls)
	db, err := models.NewDB(false)
	if err != nil {
		log.Panic(err)
	}

	if os.Getenv("ENVIRONMENT") == "prod" {
		tpl = template.Must(template.ParseFS(tmpls, "*"))
	} else {
		tpl = template.Must(template.ParseGlob("assets/templates/*.html"))
	}
	log := log.New(os.Stdout, "http: ", log.LstdFlags)
	Env = &Environment{db, tpl, log}
}
