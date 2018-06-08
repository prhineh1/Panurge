package routes

import (
	"net/http"

	"github.com/prhineh1/panurge/config"
)

func Logger(env *config.Environment, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		env.Log.Printf("Method: %v -- route: %v -- IPaddress: %v -- user-agent: %v", req.Method, req.URL.String(), req.RemoteAddr, req.UserAgent())
		next.ServeHTTP(w, req)
	})
}
