package routes

import (
	"net/http"
)

func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		ck, err := req.Cookie("session")
		if err != nil {
			http.Redirect(w, req, "/login", http.StatusSeeOther)
			return
		}

		r, err := env.Db.VerifySession(ck)
		if err != nil {
			http.Error(w, http.StatusText(500), http.StatusInternalServerError)
			return
		}
		if r == "expired" {
			ck.MaxAge = -1
			http.SetCookie(w, ck)
			http.Redirect(w, req, "/login", http.StatusSeeOther)
			return
		}

		req.Header.Add("Authorization", r)
		next.ServeHTTP(w, req)
	})
}
