package routes

import (
	"fmt"
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

		} else {
			// POST
			un := req.FormValue("username")
			p := req.FormValue("password")
			xs, _ := bcrypt.GenerateFromPassword([]byte(p), bcrypt.DefaultCost)

			err := env.Db.CreateUser(&models.User{un, xs, "registered"})
			if err != nil {
				if strings.Contains(err.Error(), "duplicate") {
					env.Tpl.ExecuteTemplate(w, "register.html", message{"This username is already taken; please choose another."})
					return
				} else {
					fmt.Println("some other error")
				}

			}

			// c := createSession(w)
			// s := session{un, time.Now()}
			// dbSessions[c.Value] = s
			http.Redirect(w, req, "/", http.StatusTemporaryRedirect)
		}
	})

}
