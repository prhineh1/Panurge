package models

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"
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

func NewDB(isTest bool) (*DB, error) {
	var err error

	postgresConn := fmt.Sprintf("user=%s dbname=%s password=%s host=%s port=%s sslmode=disable",
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_DB"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_PORT"))

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

	var schema string
	if isTest {
		schema = "test"
	} else {
		schema = "app"
	}

	// create schema
	_, err = db.Exec(fmt.Sprintf(`CREATE SCHEMA IF NOT EXISTS %s`, schema))
	if err != nil {
		return nil, err
	}

	// set search path
	_, err = db.Exec(fmt.Sprintf(`SET search_path TO %s`, schema))
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(fmt.Sprintf(`CREATE TABLE IF NOT EXISTS users(
					  id %s PRIMARY KEY,
					  username text NOT NULL UNIQUE,
					  password bytea NOT NULL,
					  email text NOT NULL UNIQUE
					  )`, ty))
	if err != nil {
		return nil, err
	}

	var redisDb int
	if isTest {
		redisDb = 2
	} else {
		redisDb = 1
	}

	redisConn := fmt.Sprintf("redis://%s:%s", os.Getenv("REDIS_HOST"), os.Getenv("REDIS_PORT"))
	cache := &redis.Pool{
		MaxIdle:     10,
		IdleTimeout: 240 * time.Second,
		Dial:        func() (redis.Conn, error) { return redis.DialURL(redisConn, redis.DialDatabase(redisDb)) },
	}

	return &DB{db, cache}, nil

}
