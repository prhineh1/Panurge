package tests

import (
	"html/template"
	"log"
	"os"
	"testing"

	"github.com/prhineh1/panurge/config"
	"github.com/prhineh1/panurge/models"
	"golang.org/x/crypto/bcrypt"
)

var TestDB *models.DB
var env *config.Environment

func TestMain(m *testing.M) {
	var err error
	TestDB, err = models.NewDB(os.Getenv("HEROKU_POSTGRESQL_GREEN_URL"),
		os.Getenv("HEROKU_REDIS_GOLD_URL"),
		true)
	if err != nil {
		log.Panic(err)
	}

	err = setUp(TestDB)
	if err != nil {
		log.Panic(err)
	}

	tpl := template.Must(template.ParseGlob("../assets/templates/*.html"))
	env = &config.Environment{&mockdb{}, tpl, nil}

	runTests := m.Run()

	err = tearDown(TestDB)
	if err != nil {
		log.Panic(err)
	}

	os.Exit(runTests)
}

func setUp(db *models.DB) error {
	var err error
	conn := db.Cache.Get()
	defer conn.Close()

	ps, _ := bcrypt.GenerateFromPassword([]byte("Abc123?!"), bcrypt.DefaultCost)
	_, err = db.Sql.Exec(`INSERT INTO users (id, username, password, email) VALUES
						 ('1', 'testuser1', $1, 'testuser1@mailinator.com'),
						 ('2', 'testuser2', $2, 'testuser2@mailinator.com'),
						 ('3', 'testuser3', $3, 'testuser3@mailinator.com')`, ps, ps, ps)
	if err != nil {
		return err
	}

	_, err = conn.Do("SET", "session:active", "testuser4")
	if err != nil {
		return err
	}

	return nil
}

func tearDown(db *models.DB) error {
	var err error

	_, err = db.Sql.Exec("DROP TABLE IF EXISTS users")
	if err != nil {
		return err
	}
	return nil
}
