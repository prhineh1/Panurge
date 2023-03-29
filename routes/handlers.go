package routes

import (
	"net/http"
	"strings"
	"log"

	"github.com/prhineh1/panurge/config"
	"github.com/prhineh1/panurge/models"
	"golang.org/x/crypto/bcrypt"
)

type Message struct {
	Error string
}

func Index(env *config.Environment) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		_, err := req.Cookie("session")
		if err != nil {
			env.Tpl.ExecuteTemplate(w, "index.html", nil)
			return
		}
		env.Tpl.ExecuteTemplate(w, "index.html", models.Session{true})
	})
}

func Register(env *config.Environment) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		// Authenticated users are re-routed to /
		if r := env.Db.Authenticate(req); r {
			http.Redirect(w, req, "/", http.StatusSeeOther)
			return
		}

		// GET
		if req.Method == "GET" {
			env.Tpl.ExecuteTemplate(w, "register.html", nil)
			return
		}
		// POST
		var err error
		un := req.FormValue("username")
		p := req.FormValue("password")
		em := req.FormValue("email")
		u := &models.User{un, []byte(p), em}

		// TODO make VerifySubmission a go routine
		err = u.VerifySubmission()
		if err != nil {
			env.Tpl.ExecuteTemplate(w, "register.html", Message{err.Error()})
			return
		}

		xs, _ := bcrypt.GenerateFromPassword([]byte(p), bcrypt.DefaultCost)
		u.Password = xs
		_, err = env.Db.CreateUser(u)
		if err != nil {
			if strings.Contains(err.Error(), "users_email_key") {
				env.Tpl.ExecuteTemplate(w, "register.html", Message{u.Email + " is already in use"})
				return
			} else if strings.Contains(err.Error(), "users_username_key") {
				env.Tpl.ExecuteTemplate(w, "register.html", Message{u.UserName + " is taken"})
				return
			}
			log.Print(err)
			http.Error(w, http.StatusText(500), http.StatusInternalServerError)
			return
		}

		//Create session
		c, _, err := env.Db.CreateSession(un, "")
		if err != nil {
			log.Print(err)
			http.Error(w, http.StatusText(500), http.StatusInternalServerError)
			return
		}
		http.SetCookie(w, c)
		http.Redirect(w, req, "/", http.StatusSeeOther)
	})
}

func Game(env *config.Environment) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		// GET
		if req.Method == "GET" && env.Db.Authenticate(req) {
			env.Tpl.ExecuteTemplate(w, "game.html", nil)
			return
		}

		// unauthenticated users are redirected to /login
		http.Redirect(w, req, "/login", http.StatusSeeOther)
	})
}

func Login(env *config.Environment) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		// Authenticated users are re-routed to /
		if r := env.Db.Authenticate(req); r {
			http.Redirect(w, req, "/", http.StatusSeeOther)
			return
		}

		// GET
		if req.Method == "GET" {
			env.Tpl.ExecuteTemplate(w, "login.html", nil)
			return
		}
		// POST
		var err error
		un := req.FormValue("username")
		ps := req.FormValue("password")
		per := req.FormValue("persist")

		err = env.Db.VerifyLogin(ps, un)
		if err != nil {
			env.Tpl.ExecuteTemplate(w, "login.html", Message{err.Error()})
			return
		}

		//Create session
		c, _, err := env.Db.CreateSession(un, per)
		if err != nil {
			http.Error(w, http.StatusText(500), http.StatusInternalServerError)
			return
		}

		http.SetCookie(w, c)
		http.Redirect(w, req, "/", http.StatusSeeOther)
	})
}

func Logout(env *config.Environment) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		c, _ := req.Cookie("session")

		env.Db.EndSession(c.Value)
		c.MaxAge = -1
		http.SetCookie(w, c)
		http.Redirect(w, req, "/login", http.StatusSeeOther)
	})
}
