CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    profile_pic TEXT,
    username VARCHAR(20) NOT NULL,
    password TEXT NOT NULL
);
CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    img TEXT,
    content TEXT,
    author_id INT REFERENCES users(id)
);