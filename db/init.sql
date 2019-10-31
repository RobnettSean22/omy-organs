DROP TABLE IF EXISTS purchase_history;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIEAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
    );
INSERT INTO users(username, password, email)
VALUES
('soullion', 'soul22', 'bricksqaud@gmail.com')



CREATE TABLE inventory(
    part_id SERIAL PRIMARY KEY,
    part_name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    quality TEXT NOT NULL,
    image TEXT NOT NULL
);
INSERT INTO inventory (part_name, price, quality, image)
VALUES
('kidney', 300, 'F', 'http://pancreatic.org/wp-content/uploads/2015/06/Head_Body_Tail-02.jpg')




CREATE TABLE purchase_history(
    purchase_id SERIAL PRIMARY KEY,
    purchase_date DATE DEFAULT NOW(),
    user_id INTEGER REFERENCES users(users_id),
    part_id INTEGER REFERENCES inventory(part_id)
);
INSERT INTO purchase_history(purchase_date, user_id, part_id)
VALUES
(1, 1)

SELECT users.user_id, username, password, email, purchase_date, inventory.part_id, price,quality, image FROM users JOIN purchase_history
ON (users.user_id = purchase_history.user_id)
JOIN inventory ON (purchase_history.part_id = inventory.part_id)