package models

import (
	"net/http"
	"time"

	"github.com/satori/go.uuid"
)

type Session struct {
	ID         string
	LastActive time.Time
	AuthToken  []byte
}

func (db *DB) createCookie(un string) (error, *http.Cookie) {
	row := db.QueryRow("SELECT roles.role FROM users INNER JOIN roles ON users.role_id = role.id WHERE username = $1", un)

	var role string
	err := row.Scan(&role)
	if err != nil {
		return err, nil
	}

	id, _ := uuid.NewV4()

	c := &http.Cookie{
		Name:  "session",
		Value: id.String(),
	}

	return nil, c

}
