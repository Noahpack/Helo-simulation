CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
is_admin CHAR, 
username VARCHAR(50), 
password TEXT);

ALTER TABLE users
ADD COLUMN picture TEXT;

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    img TEXT,
    content TEXT,
    author_id INT REFERENCES users(id)
);