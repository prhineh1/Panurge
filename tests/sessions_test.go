package tests

import (
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateSession(t *testing.T) {
	assert := assert.New(t)
	var val int
	var sid string

	// username doesn't exist
	_, _, err := TestDB.CreateSession("none", "")
	assert.Error(err)

	// redis key exists
	_, sid, _ = TestDB.CreateSession("testuser1", "true")
	val, _ = TestDB.Cache.Cmd("EXISTS", "session:"+sid).Int()
	assert.Equal(val, 1)

	// timeout was applied on key
	_, sid, _ = TestDB.CreateSession("testuser2", "false")
	val, _ = TestDB.Cache.Cmd("PERSIST", "session:"+sid).Int()
	assert.Equal(1, val)

	// cookie was created
	ck, sid, _ := TestDB.CreateSession("testuser3", "true")
	c := &http.Cookie{
		Name:  "session",
		Value: sid,
	}
	assert.Equal(c, ck)
}

func TestAuthenticate(t *testing.T) {
	assert := assert.New(t)
	var val bool

	inv := &http.Cookie{
		Name:  "session",
		Value: "none",
	}
	req1, _ := http.NewRequest("GET", "/test", nil)
	req1.AddCookie(inv)

	c := &http.Cookie{
		Name:  "session",
		Value: "active",
	}
	req2, _ := http.NewRequest("GET", "/test", nil)
	req2.AddCookie(c)

	// expired/invalid session
	val = TestDB.Authenticate(req1)
	assert.Equal(false, val)

	// valid session
	val = TestDB.Authenticate(req2)
	assert.Equal(true, val)

	// no cookie
	req3, _ := http.NewRequest("GET", "/test", nil)
	val = TestDB.Authenticate(req3)
	assert.Equal(false, val)
}

func TestEndSession(t *testing.T) {
	assert := assert.New(t)
	var val bool

	inv := &http.Cookie{
		Name:  "session",
		Value: "none",
	}

	c := &http.Cookie{
		Name:  "session",
		Value: "active",
	}

	// session ended
	val = TestDB.EndSession(c.Value)
	assert.Equal(true, val)

	// error
	val = TestDB.EndSession(inv.Value)
	assert.Equal(false, val)
}
