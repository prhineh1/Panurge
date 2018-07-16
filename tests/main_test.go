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
	TestDB, err = models.NewDB("postgres://bjxthdnmfuifuv:ecc6e5c32e42e0c68b9c811a42cbaa8c6964a022ba545f7b62296d04835d5692@ec2-54-227-240-7.compute-1.amazonaws.com:5432/d5li4mppkf5a3v",
		"redis://h:p82901be92bb76cd4025436f9f2b49d803babbfbbcf1b88cd71e932412ae856cd@ec2-54-86-234-236.compute-1.amazonaws.com:16319",
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
