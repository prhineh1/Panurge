package tests

import (
	"errors"
	"net/http"

	"github.com/prhineh1/panurge/models"
)

type mockdb struct{}

func (mdb *mockdb) CreateUser(user *models.User) (string, error) {
	switch user.UserName {
	case "createUser500":
		return "", errors.New("500")
	case "duplicateName":
		return "", errors.New("users_username_key")
	case "duplicateEmail":
		return "", errors.New("users_email_key")
	default:
		return "registerPost", nil
	}
}

func (mdb *mockdb) VerifyLogin(ps, un string) error {
	if ps == "incorrect" {
		return errors.New("Incorrect Password.")
	}
	if un == "noUser" {
		return errors.New("Username is incorrect.")
	}
	return nil
}

func (mdb *mockdb) CreateSession(un, per string) (*http.Cookie, string, error) {
	if un == "createSess500" {
		return nil, "", errors.New("500")
	}
	c := &http.Cookie{
		Name:  "session",
		Value: "idForCreateSession",
	}
	return c, "", nil
}

func (mdb *mockdb) Authenticate(req *http.Request) bool {
	c, _ := req.Cookie("session")
	switch c.Value {
	case "success":
		return true
	case "failure":
		return false
	default:
		return false
	}
}

func (mdb *mockdb) EndSession(val string) bool {
	if val == "end" {
		return true
	}
	return false
}
