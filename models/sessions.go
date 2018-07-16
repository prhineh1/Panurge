package models

import (
	"net/http"

	"github.com/gomodule/redigo/redis"
	"github.com/satori/go.uuid"
)

type Session struct {
	Active bool
}

// the second return is for testing purposes
func (db *DB) CreateSession(un, per string) (*http.Cookie, string, error) {

	var err error
	conn := db.Cache.Get()
	defer conn.Close()

	sid := uuid.NewV4()

	_, err = conn.Do("SET", "session:"+sid.String(), un)
	if err != nil {
		return nil, "", err
	}

	c := &http.Cookie{
		Name:  "session",
		Value: sid.String(),
	}

	// timed session
	if per != "true" {
		_, err = conn.Do("EXPIRE", "session:"+sid.String(), 30)
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

	conn := db.Cache.Get()
	defer conn.Close()

	r, _ := redis.Int(conn.Do("EXISTS", "session:"+ck.Value))
	if r == 0 {
		return false
	}
	return true
}

func (db *DB) EndSession(val string) bool {

	conn := db.Cache.Get()
	defer conn.Close()

	r, _ := redis.Int(conn.Do("DEL", "session:"+val))
	if r == 0 {
		return false
	}
	return true
}
