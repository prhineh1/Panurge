package tests

import (
	"testing"

	"github.com/prhineh1/panurge/models"
)

func TestCreateUser(t *testing.T) {
	un, _ := TestDB.CreateUser(&models.User{"test", []byte("abc123"), "7d7398b4-5042-4aa1-865e-c5e48e7f016d"})
	if un != "test" {
		t.Errorf("Username was incorrect; expected: %v, received: %v", "test", un)
	}

	_, err := TestDB.CreateUser(&models.User{"test", []byte("abc123"), "7d7398b4-5042-4aa1-865e-c5e48e7f016d"})
	if err == nil {
		t.Errorf("User should not be duplicated")
	}
}
