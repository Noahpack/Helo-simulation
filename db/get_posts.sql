SELECT p.title, p.postPicture, p.content, u.username, u.picture, u.id
FROM post p
JOIN users u ON p.user_id = u.id
WHERE p.id = $1;