package models

import (
	"net/http"

	"github.com/satori/go.uuid"
)

type Session struct {
	Active bool
}

// the second return is for testing purposes
func (db *DB) CreateSession(un, per string) (*http.Cookie, string, error) {

	row := db.Sql.QueryRow("SELECT users.id, roles.role FROM users INNER JOIN roles ON users.role_id = roles.id WHERE username = $1", un)

	var uid string
	var role string
	var err error
	err = row.Scan(&uid, &role)
	if err != nil {
		return nil, "", err
	}

	conn, err := db.Cache.Get()
	if err != nil {
		return nil, "", err
	}
	defer db.Cache.Put(conn)

	sid, err := uuid.NewV4()
	if err != nil {
		return nil, "", err
	}

	err = conn.Cmd("SET", "session:"+sid.String(), un).Err
	if err != nil {
		return nil, "", err
	}

	c := &http.Cookie{
		Name:  "session",
		Value: sid.String(),
	}

	// timed session
	if per != "true" {
		err = conn.Cmd("EXPIRE", "session:"+sid.String(), 30).Err
		if err != nil {
			return nil, "", err
		}
	}

	return c, sid.String(), nil
}

func (db *DB) Authenticate(req *http.Request) bool {
	ck, _ := req.Cookie("session")
	if ck == nil {
		return false
	}

	r, _ := db.Cache.Cmd("EXISTS", "session:"+ck.Value).Int()
	if r == 0 {
		return false
	}
	return true
}

func (db *DB) EndSession(val string) bool {

	r, _ := db.Cache.Cmd("DEL", "session:"+val).Int()
	if r == 0 {
		return false
	}
	return true
}
