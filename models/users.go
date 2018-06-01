package models

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	UserName string
	Password []byte
	RoleID   string
}

func (db *DB) CreateUser(user *User) (string, error) {
	var un string
	row := db.Sql.QueryRow(`INSERT INTO users (id, username, password, role_id) VALUES (uuid_generate_v4(), $1, $2, $3)
							RETURNING username`, user.UserName, user.Password, user.RoleID)
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
		return err
	}

	err2 := bcrypt.CompareHashAndPassword(pwd, []byte(ps))
	if err2 != nil {
		return errors.New("Incorrect Password.")
	}

	return nil

}
