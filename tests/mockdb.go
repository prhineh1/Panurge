package tests

import (
	"errors"
	"net/http"

	"github.com/prhineh1/Panurge/models"
)

type mockdb struct{}

func (mdb *mockdb) CreateUser(user *models.User) (string, error) {
	switch user.UserName {
	case "testuser1":
		return "", errors.New("duplicate username")
	case "createUser500":
		return "", errors.New("500")
	default:
		return "registerPost", nil
	}
}

func (mdb *mockdb) VerifyLogin(ps, un string) error {
	switch ps {
	case "incorrect":
		return errors.New("Incorrect Password.")
	case "500":
		return errors.New("500")
	default:
		return nil
	}
}

func (mdb *mockdb) CreateSession(un, per string) (*http.Cookie, error) {
	if un == "createSession500" {
		return nil, errors.New("500")
	}
	c := &http.Cookie{
		Name:  "session",
		Value: "idForCreateSession",
	}
	return c, nil
}

func (mdb *mockdb) VerifySession(ck *http.Cookie) (string, error) {
	switch ck.Value {
	case "success":
		return "admin", nil
	case "failure":
		return "expired/invalid", nil
	default:
		return "", errors.New("500")
	}
}
