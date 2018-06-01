package tests

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/prhineh1/Panurge/routes"
	"github.com/stretchr/testify/assert"
)

var generic http.Handler

func TestAuthenticate(t *testing.T) {
	assert := assert.New(t)

	// No cookie
	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("GET", "/", nil)
	routes.Authenticate(http.NotFoundHandler()).ServeHTTP(rec, req)
	assert.Equal("expired/invalid", req.Header.Get("Authorization"))

	// Valid cookie
	rec = httptest.NewRecorder()
	req, _ = http.NewRequest("GET", "/", nil)
	c := &http.Cookie{
		Name:  "session",
		Value: "foo",
	}
	generic = http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		req.AddCookie(c)
		routes.Authenticate(http.NotFoundHandler()).ServeHTTP(w, req)
	})
	generic.ServeHTTP(rec, req)
	assert.Equal("admin", req.Header.Get("Authorization"))
}
