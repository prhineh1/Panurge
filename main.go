package main

import (
	"net/http"
	"text/template"
	"time"

	"github.com/satori/go.uuid"
	"golang.org/x/crypto/bcrypt"
)

type user struct {
	UserName string
	Password []byte
	First    string
	Last     string
	Role     string
}

type error struct {
	Error string
}

type session struct {
	UserName   string
	lastActive time.Time
}

var dbUsers = map[string]user{}
var dbSessions = map[string]session{}
var tpl *template.Template
var sessionTimeout time.Time

const sessionLength int = 30

func init() {
	xs, _ := bcrypt.GenerateFromPassword([]byte("wanwa1Ha"), bcrypt.DefaultCost)
	dbUsers["prhineh1"] = user{"prhineh1", xs, "Phil", "Rhinehart", "Admin"}
	tpl = template.Must(template.ParseGlob("templates/*.html"))
	sessionTimeout = time.Now()
}

func main() {

	http.HandleFunc("/", index)
	http.HandleFunc("/login", login)
	http.HandleFunc("/loginSubmit", loginSubmit)
	http.HandleFunc("/register", register)
	http.HandleFunc("/registerSubmit", registerSubmit)
	http.HandleFunc("/logout", logout)
	http.ListenAndServe(":8080", nil)
}

func index(w http.ResponseWriter, req *http.Request) {
	if !authenticate(w, req) {
		http.Redirect(w, req, "/login", http.StatusSeeOther)
		return
	}

	user := getUser(w, req)
	tpl.ExecuteTemplate(w, "index.html", user)
}

func login(w http.ResponseWriter, req *http.Request) {
	if authenticate(w, req) {
		http.Redirect(w, req, "/", http.StatusSeeOther)
		return
	}

	tpl.ExecuteTemplate(w, "login.html", nil)
}

func loginSubmit(w http.ResponseWriter, req *http.Request) {
	un := req.FormValue("username")
	p := req.FormValue("password")

	// if the user does not exist
	u, ok := dbUsers[un]
	if !ok {
		tpl.ExecuteTemplate(w, "login.html", error{"This user does not exist."})
		return
	}

	// if password doesn't match
	err := bcrypt.CompareHashAndPassword(u.Password, []byte(p))
	if err != nil {
		tpl.ExecuteTemplate(w, "login.html", error{"Incorrect password."})
		return
	}

	c := createSession(w)
	s := session{un, time.Now()}
	dbSessions[c.Value] = s
	http.Redirect(w, req, "/", http.StatusTemporaryRedirect)

}

func register(w http.ResponseWriter, req *http.Request) {
	if authenticate(w, req) {
		http.Redirect(w, req, "/", http.StatusSeeOther)
		return
	}

	tpl.ExecuteTemplate(w, "register.html", nil)
}

func registerSubmit(w http.ResponseWriter, req *http.Request) {
	un := req.FormValue("username")
	p := req.FormValue("password")
	f := req.FormValue("firstname")
	l := req.FormValue("lastname")

	// check if username is already taken
	_, ok := dbUsers[un]
	if ok {
		tpl.ExecuteTemplate(w, "register.html", error{"This username is taken."})
		return
	}

	xs, _ := bcrypt.GenerateFromPassword([]byte(p), bcrypt.DefaultCost)
	dbUsers[un] = user{un, xs, f, l, "visitor"}
	c := createSession(w)
	s := session{un, time.Now()}
	dbSessions[c.Value] = s
	http.Redirect(w, req, "/", http.StatusTemporaryRedirect)
}

func logout(w http.ResponseWriter, req *http.Request) {
	c, err := req.Cookie("session")
	if err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
	delete(dbSessions, c.Value)
	c.MaxAge = -1
	http.SetCookie(w, c)

	// clean sessions
	if time.Now().Sub(sessionTimeout) > (time.Second * 30) {
		go cleanSessions()
	}

	http.Redirect(w, req, "/login", http.StatusSeeOther)
}

func createSession(w http.ResponseWriter) *http.Cookie {
	sID, _ := uuid.NewV4()
	c := &http.Cookie{
		Name:   "session",
		Value:  sID.String(),
		MaxAge: sessionLength,
	}
	http.SetCookie(w, c)
	return c
}

func authenticate(w http.ResponseWriter, req *http.Request) bool {
	// check for a cookie
	c, err := req.Cookie("session")
	if err != nil {
		return false
	}

	// refresh session
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	// check for a user
	_, ok := dbUsers[dbSessions[c.Value].UserName]
	return ok
}

func getUser(w http.ResponseWriter, req *http.Request) user {
	c, _ := req.Cookie("session")

	var u user
	ses, ok := dbSessions[c.Value]
	if ok {
		u = dbUsers[ses.UserName]
	}
	return u
}

func cleanSessions() {
	for k, v := range dbSessions {
		if time.Now().Sub(v.lastActive) > (time.Minute * 5) {
			delete(dbSessions, k)
		}
	}
}
