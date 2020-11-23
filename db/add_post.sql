INSERT INTO post(title, content, postPicture, user_id)
VALUES($1, $2, $3, $4)
RETURNING *;