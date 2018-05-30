package tests

import (
	"log"
	"os"
	"testing"

	"github.com/prhineh1/panurge/models"
)

var TestDB *models.DB

func TestMain(m *testing.M) {
	var err error
	TestDB, err = models.NewDB("postgres://postgres:wanwa1Ha@localhost/testurge?sslmode=disable", true)
	if err != nil {
		log.Panic(err)
	}
	runTests := m.Run()
	err = models.TearDown(TestDB)
	if err != nil {
		log.Panic(err)
	}
	os.Exit(runTests)
}
