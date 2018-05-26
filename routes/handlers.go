package routes

import (
	"net/http"
	"strings"

	"github.com/prhineh1/panurge/config"
	"github.com/prhineh1/panurge/models"
	"golang.org/x/crypto/bcrypt"
)

type message struct {
	Error string
}

func Register(env *config.Environment) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		// GET
		if req.Method == "GET" {
			// if auth, _ := authenticate(w, req); auth {
			// 	http.Redirect(w, req, "/", http.StatusSeeOther)
			// 	return
			// }

			env.Tpl.ExecuteTemplate(w, "register.html", nil)
			return

		} else {
			// POST
			un := req.FormValue("username")
			p := req.FormValue("password")
			xs, _ := bcrypt.GenerateFromPassword([]byte(p), bcrypt.DefaultCost)

			err := env.Db.CreateUser(&models.User{un, xs, "5fb892bd-12b0-4943-aee2-3ccf49a12b99"})
			if err != nil {
				if strings.Contains(err.Error(), "duplicate") {
					env.Tpl.ExecuteTemplate(w, "register.html", message{"This username is already taken; please choose another."})
					return
				}

				http.Error(w, http.StatusText(500), http.StatusInternalServerError)
				return
			}

			// c := createSession(w)
			// s := session{un, time.Now()}
			// dbSessions[c.Value] = s
			http.Redirect(w, req, "/", http.StatusSeeOther)
		}
	})
}

func login(env *config.Environment) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		// GET
		if req.Method == "GET" {
			env.Tpl.ExecuteTemplate(w, "login.html", nil)
			return
		}
		// POST
		un := req.FormValue("username")
		ps := req.FormValue("password")

		err := env.Db.VerifyLogin(ps, un)
		if err != nil {
			if err.Error() == "Incorrect Password." {
				env.Tpl.ExecuteTemplate(w, "login.html", message{err.Error()})
				return
			}

			http.Error(w, http.StatusText(500), http.StatusInternalServerError)
			return
		}

		//Create session
	})
}
