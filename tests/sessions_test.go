package tests

import (
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateSession(t *testing.T) {
	assert := assert.New(t)
	var val int

	// username doesn't exist
	_, err := TestDB.CreateSession("none", "")
	assert.Error(err)

	// redis hashset exists
	TestDB.CreateSession("testuser1", "true")
	val, _ = TestDB.Cache.Cmd("HLEN", "user:1").Int()
	assert.Equal(val, 2)

	// timeout was applied on hashset key
	TestDB.CreateSession("testuser2", "false")
	val, _ = TestDB.Cache.Cmd("PERSIST", "user:2").Int()
	assert.Equal(1, val)

	// cookie was created
	c := &http.Cookie{
		Name:  "session",
		Value: "3",
	}
	ck, _ := TestDB.CreateSession("testuser3", "true")
	assert.Equal(c, ck)
}

func TestVerifySession(t *testing.T) {
	assert := assert.New(t)
	var val string

	inv := &http.Cookie{
		Name:  "session",
		Value: "none",
	}

	c := &http.Cookie{
		Name:  "session",
		Value: "4",
	}

	// expired/invalid session
	val, _ = TestDB.VerifySession(inv)
	assert.Equal("expired/invalid", val)

	// valid session
	val, _ = TestDB.VerifySession(c)
	assert.Equal("registered", val)
}
