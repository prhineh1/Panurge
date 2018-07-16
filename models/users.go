package models

import (
	"errors"
	"regexp"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	UserName string
	Password []byte
	Email    string
}

func (db *DB) CreateUser(user *User) (string, error) {
	var un string
	row := db.Sql.QueryRow(`INSERT INTO users (id, username, password, email) VALUES (gen_random_uuid(), $1, $2, $3)
							RETURNING username`, user.UserName, user.Password, user.Email)
	err := row.Scan(&un)
	if err != nil {
		return "", err
	}
	return un, nil
}

func (db *DB) VerifyLogin(ps, un string) error {
	row := db.Sql.QueryRow("SELECT password FROM users WHERE username = $1", un)

	var pwd []byte
	err := row.Scan(&pwd)
	if err != nil {
		return errors.New("Username is incorrect.")
	}

	err2 := bcrypt.CompareHashAndPassword(pwd, []byte(ps))
	if err2 != nil {
		return errors.New("Incorrect Password.")
	}

	return nil
}

func (u *User) VerifySubmission() error {
	rxUn := regexp.MustCompile(`^[A-Za-z0-9]{3,15}`)
	rxEm := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	rxPs := map[string]*regexp.Regexp{}
	rxPs["uppers"] = regexp.MustCompile(`[A-Z]`)
	rxPs["lowers"] = regexp.MustCompile(`[a-z]`)
	rxPs["numbers"] = regexp.MustCompile(`[0-9]`)
	rxPs["exclude"] = regexp.MustCompile(`[^A-Za-z0-9!#$%^*?,./\\_]`)
	rxPs["length"] = regexp.MustCompile(`^.{8,}$`)

	// username
	if rxUn.FindString(u.UserName) != u.UserName {
		return errors.New("invalid username")
	}

	// password
	for key, val := range rxPs {
		switch key {
		case "exclude":
			if len(val.FindSubmatch(u.Password)) > 0 {
				return errors.New("invalid password")
			}
		case "length":
			if !val.Match(u.Password) {
				return errors.New("invalid password")
			}
		default:
			if len(val.FindSubmatch(u.Password)) == 0 {
				return errors.New("invalid password")
			}
		}
	}

	// email
	if len(u.Email) > 254 || rxEm.FindString(u.Email) != u.Email {
		return errors.New("invalid email")
	}

	return nil
}
