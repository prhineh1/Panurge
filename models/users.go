package models

type User struct {
	UserName string
	Password []byte
	RoleID   string
}

func (db *DB) CreateUser(user *User) error {
	_, err := db.Exec("INSERT INTO users (id, username, password, role_id) VALUES (uuid_generate_v4(), $1, $2, $3)", user.UserName, user.Password, user.RoleID)
	if err != nil {
		return err
	}
	return nil
}
