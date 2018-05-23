package models

type User struct {
	UserName string
	Password []byte
	Role     string
}

func (db *DB) CreateUser(user *User) error {
	_, err := db.Exec("INSERT INTO users (id, username, password, role) VALUES (uuid_generate_v4(), $1, $2, $3)", user.UserName, user.Password, user.Role)
	if err != nil {
		return err
	}
	return nil
}
