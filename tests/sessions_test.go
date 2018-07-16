package tests

import (
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateSession(t *testing.T) {
	assert := assert.New(t)
	conn := TestDB.Cache.Get()
	defer conn.Close()

	// redis key exists
	ck, sid, _ := TestDB.CreateSession("testuser1", "false")
	val, _ := conn.Do("EXISTS", "session:"+sid)
	assert.Equal(int64(1), val)

	// timeout was applied on key
	val, _ = conn.Do("PERSIST", "session:"+sid)
	assert.Equal(int64(1), val)

	// cookie was created
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
