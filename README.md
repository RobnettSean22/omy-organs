# Body Parts Ebay

## Frontend (react)

## Backend (express)
    - express
    - massive
    - dotenv
    - express-session
    - bcrypt
### server/
    -db/
    - index.js
    - controller/
        - userController.js
        - inventoryController.js
    -middleware/
        - sessionCheck.js

### endponts

**User/auth**

- userSession: => get => /auth/session
- register: => /auth/register
- logout: => /auth/logout
- login: => /auth/login

- addToCart: => post => /api/add_to_cart
- getCart: => get => /api/get_cart
- deleteFromCart: => delete => api/delete_from_cart/:id
- updateEmail: => put => /api/update_email
- getPurchaseHistory => get =>/api/purchase_history:id

**inventory**
- showAllInventory => get => /api/showinventory


### secrets

```text
CONNECTION_STRING=
SESSION_SECRET=
SERVER_PORT=


```


## database (postgreSQl)

- User table

```sql
CREATE TABLE users (
    user_id SERIEAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
    );


```

- Admin table(icebox)

- Body Parts Inventory

```sql
CREate table inventory(
    part_id SERIAL PRIMARY KEY,
    part_name VARCHAR(64) NOT NULL,
    price INTEGER
    quality TEXT NOT NULL,
    image TEXT NOT NULL
)

```

- purchase history


```sql
    CREATE TABLE purchase_history(
        purchase_id SERIAL PRIMARY KEY,
        purchase_date DATE DEFAULT NOW(),
        user_id INTEGER REFERENCES users(users_id),
        part_id INTEGER REFERENCES inventory(part_id)
    )

```