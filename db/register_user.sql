INSERT INTO users (username, password, picture)
VALUES ($1, $2, $3)
RETURNING *;