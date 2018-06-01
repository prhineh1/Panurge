package routes

import (
	"net/http"
	"strings"

	"github.com/prhineh1/Panurge/config"
	"github.com/prhineh1/Panurge/models"
	"golang.org/x/crypto/bcrypt"
)

type Message struct {
	Error string
}

var env = config.Env

func Register(env *config.Environment) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		// GET
		if req.Method == "GET" {
			env.Tpl.ExecuteTemplate(w, "register.html", nil)
			return
		}
		// POST
		un := req.FormValue("username")
		p := req.FormValue("password")
		xs, _ := bcrypt.GenerateFromPassword([]byte(p), bcrypt.DefaultCost)

		var err error
		_, err = env.Db.CreateUser(&models.User{un, xs, "5fb892bd-12b0-4943-aee2-3ccf49a12b99"})
		if err != nil {
			if strings.Contains(err.Error(), "duplicate") {
				env.Tpl.ExecuteTemplate(w, "register.html", Message{"This username is already taken; please choose another."})
				return
			}
			http.Error(w, http.StatusText(500), http.StatusInternalServerError)
			return
		}

		//Create session
		c, err := env.Db.CreateSession(un, "")
		if err != nil {
			http.Error(w, http.StatusText(500), http.StatusInternalServerError)
			return
		}
		http.SetCookie(w, c)
		http.Redirect(w, req, "/", http.StatusSeeOther)
	})
}

func Login(env *config.Environment) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		var err error
		// GET
		if req.Method == "GET" {
			env.Tpl.ExecuteTemplate(w, "login.html", nil)
			return
		}
		// POST
		un := req.FormValue("username")
		ps := req.FormValue("password")
		per := req.FormValue("persist")

		err = env.Db.VerifyLogin(ps, un)
		if err != nil {
			if err.Error() == "Incorrect Password." {
				env.Tpl.ExecuteTemplate(w, "login.html", Message{err.Error()})
				return
			}

			http.Error(w, http.StatusText(500), http.StatusInternalServerError)
			return
		}

		//Create session
		c, err := env.Db.CreateSession(un, per)
		if err != nil {
			http.Error(w, http.StatusText(500), http.StatusInternalServerError)
			return
		}

		http.SetCookie(w, c)
		http.Redirect(w, req, "/", http.StatusSeeOther)
	})
}
