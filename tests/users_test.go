package tests

import (
	"log"
	"testing"

	"github.com/prhineh1/panurge/models"
	"github.com/stretchr/testify/assert"
)

func TestCreateUser(t *testing.T) {
	assert := assert.New(t)
	var err error

	// successfully create a user
	un, err := TestDB.CreateUser(&models.User{"CreateUserTemp", []byte("Abc123?!"), "temp@mailinator.com"})
	if err != nil {
		tearDown(TestDB)
		log.Panic(err)
	}
	assert.Equal("CreateUserTemp", un)

	// attempt to create user with duplicate username
	_, err = TestDB.CreateUser(&models.User{"CreateUserTemp", []byte("Abc123?!"), "temp2@mailinator.com"})
	assert.Error(err)

	// attempt to create user with duplicate email
	_, err = TestDB.CreateUser(&models.User{"CreateUserTempAgain", []byte("Abc123?!"), "temp@mailinator.com"})
	assert.Error(err)
}

func TestVerifyLogin(t *testing.T) {
	var err error
	assert := assert.New(t)

	// password doesn't match
	err = TestDB.VerifyLogin("waneaa3Ea", "testuser1")
	assert.Equal("Incorrect Password.", err.Error())

	// username doesn't exist
	err = TestDB.VerifyLogin("Abc123?!", "tesasdfuser1")
	assert.Equal("Username is incorrect.", err.Error())

	// successful
	err = TestDB.VerifyLogin("Abc123?!", "testuser1")
	assert.Nil(err)
}

func TestVerifySubmission(t *testing.T) {
	assert := assert.New(t)
	var u *models.User
	var err error

	// valid data
	u = &models.User{"testuser5", []byte("Abc123!?"), "testuser5@gmail.com"}
	err = u.VerifySubmission()
	assert.Nil(err)

	// username too short
	u = &models.User{"te", []byte("Abc123!?"), "testuser5@gmail.com"}
	err = u.VerifySubmission()
	assert.Equal(err.Error(), "invalid username")

	// username too long
	u = &models.User{"testuser5testuser5testuser5", []byte("Abc123!?"), "testuser5@gmail.com"}
	err = u.VerifySubmission()
	assert.Equal(err.Error(), "invalid username")

	// username contains illegal chars
	u = &models.User{"testu?ser5!", []byte("Abc123!?"), "testuser5@gmail.com"}
	err = u.VerifySubmission()
	assert.Equal(err.Error(), "invalid username")

	// password too short
	u = &models.User{"testuser5", []byte("Abc123"), "testuser5@gmail.com"}
	err = u.VerifySubmission()
	assert.Equal(err.Error(), "invalid password")

	// password lacks uppercase
	u = &models.User{"testuser5", []byte("abc123!?"), "testuser5@gmail.com"}
	err = u.VerifySubmission()
	assert.Equal(err.Error(), "invalid password")

	// password lacks lowercase
	u = &models.User{"testuser5", []byte("ABC123!?"), "testuser5@gmail.com"}
	err = u.VerifySubmission()
	assert.Equal(err.Error(), "invalid password")

	// password lacks numerals
	u = &models.User{"testuser5", []byte("AbcCba!?"), "testuser5@gmail.com"}
	err = u.VerifySubmission()
	assert.Equal(err.Error(), "invalid password")

	// passwords contains illegal chars
	u = &models.User{"testuser5", []byte("Abc123(){}"), "testuser5@gmail.com"}
	err = u.VerifySubmission()
	assert.Equal(err.Error(), "invalid password")

	// various invalid emails
	u = &models.User{"testuser5", []byte("Abc123!?"), ""}
	em := []string{
		"plainaddress",
		"#@%^%#$@#$@#.com",
		"@example.com",
		"Joe Smith <email@example.com>",
		"email.example.com",
		"email@example@example.com",
		"あいうえお@example.com",
		"email@example.com (Joe Smith)",
		"email@-example.com",
		"email@example..com",
	}

	for i := 0; i < len(em); i++ {
		u.Email = em[i]
		err = u.VerifySubmission()
		assert.Equal(err.Error(), "invalid email")
	}

}
