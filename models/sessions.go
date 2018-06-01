package models

import (
	"net/http"
	"time"

	"github.com/mediocregopher/radix.v2/redis"
)

type Session struct {
	ID         string
	LastActive time.Time
	Role       string
}

func (db *DB) CreateSession(un, per string) (*http.Cookie, error) {

	row := db.Sql.QueryRow("SELECT users.id, roles.role FROM users INNER JOIN roles ON users.role_id = roles.id WHERE username = $1", un)

	var uid string
	var role string
	var err error
	err = row.Scan(&uid, &role)
	if err != nil {
		return nil, err
	}

	conn, err := db.Cache.Get()
	if err != nil {
		return nil, err
	}
	defer db.Cache.Put(conn)

	err = conn.Cmd("HMSET", "user:"+uid, "lastActive", time.Now(), "role", role).Err
	if err != nil {
		return nil, err
	}

	c := &http.Cookie{
		Name:  "session",
		Value: uid,
	}

	// timed session
	if per != "true" {
		err = conn.Cmd("EXPIRE", "user:"+uid, 30).Err
		if err != nil {
			return nil, err
		}
	}

	return c, nil
}

func (db *DB) VerifySession(ck *http.Cookie) (string, error) {

	r := db.Cache.Cmd("HGET", "user:"+ck.Value, "role")
	if r.IsType(redis.Nil) {
		return "expired/invalid", nil
	}

	return r.Str()
}
