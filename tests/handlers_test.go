package tests

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/prhineh1/Panurge/routes"
	"github.com/stretchr/testify/assert"
)

var rec *httptest.ResponseRecorder
var req *http.Request
var doc bytes.Buffer

func TestRegister(t *testing.T) {
	assert := assert.New(t)

	// GET
	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("GET", "/Register", nil)
	routes.Register(env).ServeHTTP(rec, req)
	env.Tpl.ExecuteTemplate(&doc, "register.html", nil)
	assert.Equal(doc.String(), rec.Body.String())
	assert.Equal(200, rec.Result().StatusCode)

	// POST: confirm cookie exists
	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/Register?username=registerPost&password=abc123", nil)
	routes.Register(env).ServeHTTP(rec, req)
	cs := rec.Result().Cookies()
	assert.Equal("idForCreateSession", cs[0].Value)
	assert.Equal(303, rec.Result().StatusCode)

	// POST: duplicate username
	doc.Reset()
	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/Register?username=testuser1&password=abc123", nil)
	routes.Register(env).ServeHTTP(rec, req)
	env.Tpl.ExecuteTemplate(&doc, "register.html", routes.Message{"This username is already taken; please choose another."})
	assert.Equal(doc.String(), rec.Body.String())

	// POST: 500 errors
	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/Register?username=createUser500&password=abc123", nil)
	routes.Register(env).ServeHTTP(rec, req)
	assert.Equal(500, rec.Result().StatusCode)

	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/Register?username=createSession500&password=abc123", nil)
	routes.Register(env).ServeHTTP(rec, req)
	assert.Equal(500, rec.Result().StatusCode)
}

func TestLogin(t *testing.T) {
	assert := assert.New(t)

	// GET
	doc.Reset()
	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("GET", "/Login", nil)
	routes.Login(env).ServeHTTP(rec, req)
	env.Tpl.ExecuteTemplate(&doc, "login.html", nil)
	assert.Equal(doc.String(), rec.Body.String())
	assert.Equal(200, rec.Result().StatusCode)

	// POST confirm cookie exists
	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/Login?username=loginPost&password=abc123&persist=false", nil)
	routes.Login(env).ServeHTTP(rec, req)
	cs := rec.Result().Cookies()
	assert.Equal("idForCreateSession", cs[0].Value)
	assert.Equal(303, rec.Result().StatusCode)

	// POST incorrect password
	doc.Reset()
	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/Login?username=loginPost&password=incorrect&persist=false", nil)
	routes.Login(env).ServeHTTP(rec, req)
	env.Tpl.ExecuteTemplate(&doc, "login.html", routes.Message{"Incorrect Password."})
	assert.Equal(doc.String(), rec.Body.String())
	assert.Equal(200, rec.Result().StatusCode)

	// POST 500 errors
	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/Login?username=loginPost&password=500&persist=false", nil)
	routes.Login(env).ServeHTTP(rec, req)
	assert.Equal(500, rec.Result().StatusCode)

	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/Login?username=createSession500&password=abc123&persist=false", nil)
	routes.Login(env).ServeHTTP(rec, req)
	assert.Equal(500, rec.Result().StatusCode)
}
