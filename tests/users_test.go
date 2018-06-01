package tests

import (
	"log"
	"testing"

	"github.com/prhineh1/Panurge/models"
	"github.com/stretchr/testify/assert"
)

func TestCreateUser(t *testing.T) {
	assert := assert.New(t)

	// successfully create a user
	un, err1 := TestDB.CreateUser(&models.User{"CreateUserTemp", []byte("abc123"), "502b2348-bd8a-4c26-868f-7ae1f5bc5896"})
	if err1 != nil {
		tearDown(TestDB)
		log.Panic(err1)
	}
	assert.Equal("CreateUserTemp", un)

	// attempt to create user with duplicate username
	_, err := TestDB.CreateUser(&models.User{"CreateUserTemp", []byte("abc123"), "502b2348-bd8a-4c26-868f-7ae1f5bc5896"})
	assert.Error(err)
}

func TestVerifyLogin(t *testing.T) {
	var err error
	assert := assert.New(t)

	// username doesn't exist
	err = TestDB.VerifyLogin("wanwa2Ha", "prhineh1")
	assert.Error(err)

	// password doesn't match
	err = TestDB.VerifyLogin("wanwa3Ea", "testuser1")
	assert.Equal(err.Error(), "Incorrect Password.")

	// password matches
	err = TestDB.VerifyLogin("wanwa1Ha", "testuser1")
	assert.Error(err)
}
