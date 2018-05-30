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

func (db *DB) CreateSession(un, per string) (error, *http.Cookie) {

	row := db.sql.QueryRow("SELECT users.id, roles.role FROM users INNER JOIN roles ON users.role_id = roles.id WHERE username = $1", un)

	var uid string
	var role string
	var err error
	err = row.Scan(&uid, &role)
	if err != nil {
		return err, nil
	}

	conn, err := db.cache.Get()
	if err != nil {
		return err, nil
	}
	defer db.cache.Put(conn)

	err = conn.Cmd("HMSET", "user:"+uid, "lastActive", time.Now(), "role", role).Err
	if err != nil {
		return err, nil
	}

	c := &http.Cookie{
		Name:  "session",
		Value: uid,
	}

	// timed session
	if per != "true" {
		err = conn.Cmd("EXPIRE", "user:"+uid, 30).Err
		if err != nil {
			return err, nil
		}
	}

	return nil, c
}

func (db *DB) VerifySession(ck *http.Cookie) (string, error) {

	r := db.cache.Cmd("HGET", "user:"+ck.Value, "role")
	if r.IsType(redis.Nil) {
		return "expired", nil
	}

	return r.Str()
}
