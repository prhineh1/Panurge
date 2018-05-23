package main

import (
	"net/http"
	"time"

	"github.com/prhineh1/panurge/config"
	"github.com/prhineh1/panurge/routes"
)

type error struct {
	Error string
}

type session struct {
	UserName   string
	lastActive time.Time
}

var dbSessions = map[string]session{}

const sessionLength int = 30

func main() {

	http.Handle("/", routes.Register(config.Env))
	// http.HandleFunc("/login", login)
	// http.HandleFunc("/loginSubmit", loginSubmit)
	http.Handle("/register", routes.Register(config.Env))
	// http.HandleFunc("/logout", logout)
	http.ListenAndServe(":8080", nil)
}

// func index(w http.ResponseWriter, req *http.Request) {
// 	auth, user := authenticate(w, req)
// 	if !auth {
// 		http.Redirect(w, req, "/login", http.StatusSeeOther)
// 		return
// 	}

// 	tpl.ExecuteTemplate(w, "index.html", user)
// }

// func login(w http.ResponseWriter, req *http.Request) {
// 	if auth, _ := authenticate(w, req); auth {
// 		http.Redirect(w, req, "/", http.StatusSeeOther)
// 		return
// 	}

// 	tpl.ExecuteTemplate(w, "login.html", nil)
// }

// func loginSubmit(w http.ResponseWriter, req *http.Request) {
// 	un := req.FormValue("username")
// 	p := req.FormValue("password")

// 	// if the user does not exist
// 	u, ok := dbUsers[un]
// 	if !ok {
// 		tpl.ExecuteTemplate(w, "login.html", error{"This user does not exist."})
// 		return
// 	}

// 	// if password doesn't match
// 	err := bcrypt.CompareHashAndPassword(u.Password, []byte(p))
// 	if err != nil {
// 		tpl.ExecuteTemplate(w, "login.html", error{"Incorrect password."})
// 		return
// 	}

// 	c := createSession(w)
// 	s := session{un, time.Now()}
// 	dbSessions[c.Value] = s
// 	http.Redirect(w, req, "/", http.StatusTemporaryRedirect)

// }

// func (env *Env) register(w http.ResponseWriter, req *http.Request) {
// 	// if auth, _ := authenticate(w, req); auth {
// 	// 	http.Redirect(w, req, "/", http.StatusSeeOther)
// 	// 	return
// 	// }

// 	env.tpl.ExecuteTemplate(w, "register.html", nil)
// }

// func (env *Env) registerSubmit(w http.ResponseWriter, req *http.Request) {
// 	un := req.FormValue("username")
// 	p := req.FormValue("password")

// 	// check if username is already taken
// 	// _, ok := dbUsers[un]
// 	// if ok {
// 	// 	tpl.ExecuteTemplate(w, "register.html", error{"This username is taken."})
// 	// 	return
// 	// }

// 	xs, _ := bcrypt.GenerateFromPassword([]byte(p), bcrypt.DefaultCost)
// 	env.db.CreateUser(&models.User{un, xs, "visitor"})

// 	// c := createSession(w)
// 	// s := session{un, time.Now()}
// 	// dbSessions[c.Value] = s
// 	http.Redirect(w, req, "/", http.StatusTemporaryRedirect)
// }

// func logout(w http.ResponseWriter, req *http.Request) {
// 	c, err := req.Cookie("session")
// 	if err != nil {
// 		http.Error(w, "server error", http.StatusInternalServerError)
// 		return
// 	}
// 	delete(dbSessions, c.Value)
// 	c.MaxAge = -1
// 	http.SetCookie(w, c)

// 	// clean sessions
// 	if time.Now().Sub(sessionTimeout) > (time.Second * 30) {
// 		go cleanSessions()
// 	}

// 	http.Redirect(w, req, "/login", http.StatusSeeOther)
// }

// func createSession(w http.ResponseWriter) *http.Cookie {
// 	sID, _ := uuid.NewV4()
// 	c := &http.Cookie{
// 		Name:   "session",
// 		Value:  sID.String(),
// 		MaxAge: sessionLength,
// 	}
// 	http.SetCookie(w, c)
// 	return c
// }

// func authenticate(w http.ResponseWriter, req *http.Request) (b bool, u user) {
// 	// check for a cookie
// 	c, err := req.Cookie("session")
// 	if err != nil {
// 		return false, user{}
// 	}

// 	// refresh session
// 	c.MaxAge = sessionLength
// 	http.SetCookie(w, c)

// 	// check for a user
// 	u, ok := dbUsers[dbSessions[c.Value].UserName]
// 	return ok, u
// }

// func cleanSessions() {
// 	for k, v := range dbSessions {
// 		if time.Now().Sub(v.lastActive) > (time.Minute * 5) {
// 			delete(dbSessions, k)
// 		}
// 	}
// }
