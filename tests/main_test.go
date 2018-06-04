package tests

import (
	"html/template"
	"log"
	"os"
	"testing"

	"github.com/prhineh1/Panurge/config"
	"github.com/prhineh1/Panurge/models"
)

var TestDB *models.DB
var env *config.Environment

func TestMain(m *testing.M) {
	var err error
	TestDB, err = models.NewDB("postgres://postgres:wanwa1Ha@localhost/testurge?sslmode=disable", true)
	if err != nil {
		log.Panic(err)
	}

	err = setUp(TestDB)
	if err != nil {
		log.Panic(err)
	}

	tpl := template.Must(template.ParseGlob("../templates/*.html"))
	env = &config.Environment{&mockdb{}, tpl}

	runTests := m.Run()

	err = tearDown(TestDB)
	if err != nil {
		log.Panic(err)
	}

	os.Exit(runTests)
}

func setUp(db *models.DB) error {
	var err error
	_, err = db.Sql.Exec(`INSERT INTO users (id, username, password, role_id) VALUES
						 ('1', 'testuser1', $1, '5fb892bd-12b0-4943-aee2-3ccf49a12b99'),
						 ('2', 'testuser2', $2, '502b2348-bd8a-4c26-868f-7ae1f5bc5896'),
						 ('3', 'testuser3', $3, '502b2348-bd8a-4c26-868f-7ae1f5bc5896')`, []byte("abc123"), []byte("abc123"), []byte("abc123"))
	if err != nil {
		return err
	}

	err = db.Cache.Cmd("SET", "session:active", "testuser4").Err
	if err != nil {
		return err
	}

	return nil
}

func tearDown(db *models.DB) error {
	var err error
	_, err = db.Sql.Exec("DELETE FROM users")
	if err != nil {
		return err
	}
	err = db.Cache.Cmd("DEL", "user:4").Err
	if err != nil {
		return err
	}
	return nil
}
