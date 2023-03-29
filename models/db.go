package models

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/gomodule/redigo/redis"
	_ "github.com/lib/pq"
)

type Datastore interface {
	CreateUser(user *User) (string, error)
	VerifyLogin(ps, un string) error
	CreateSession(un, per string) (*http.Cookie, string, error)
	Authenticate(req *http.Request) bool
	EndSession(val string) bool
}

type DB struct {
	Sql   *sql.DB
	Cache *redis.Pool
}

func NewDB(postgresConn, redisConn string, isTest bool) (*DB, error) {
	var err error

	db, err := sql.Open("postgres", postgresConn)
	if err != nil {
		return nil, err
	}
	if err = db.Ping(); err != nil {
		return nil, err
	}

	// Create plugins
	_, err = db.Exec(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`)
	if err != nil {
		return nil, err
	}

	// create tables
	var ty string
	if isTest {
		ty = "text"
	} else {
		ty = "uuid"
	}

	// create schema
	_, err = db.Exec(`CREATE SCHEMA IF NOT EXISTS app`)
	if err != nil {
		return nil, err
	}

	// set search path
	_, err = db.Exec(`SET search_path TO app`)
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS users(
					  id ` + ty + ` PRIMARY KEY,
					  username text NOT NULL UNIQUE,
					  password bytea NOT NULL,
					  email text NOT NULL UNIQUE
					  )`)
	if err != nil {
		return nil, err
	}

	cache := &redis.Pool{
		MaxIdle:     10,
		IdleTimeout: 240 * time.Second,
		Dial:        func() (redis.Conn, error) { return redis.DialURL(redisConn) },
	}

	return &DB{db, cache}, nil

}
