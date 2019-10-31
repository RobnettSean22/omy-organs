INSERT INTO users (email, password, username)
VALUES 
($1, $2, $3);

Select email, username
WHERE email = $1;