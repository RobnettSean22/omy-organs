require('dotenv').config()
const express = require('express');
const app = express()
app.use(express.json());
const {register, logout, login, userSession} = require('./controller/userController')
const session = require('express-session');
const massive = require('massive');


const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized:false,
    cookie: {
        maxAge: 1000 * 60 * 60 *24 * 14//two weeks
    }
}))
console.log(CONNECTION_STRING)
massive(CONNECTION_STRING).then(db => {
    console.log('database is firing')
    db.init2().then(() => {
        app.set('db', db);
    })
})


// app.get('/api/test', (req, res, next) => {
//     const db = req.app.get('db');
//     db.query('SELECT * FROM users;').then(users => {
//         res.status(200).send(users);
//     })
// })

app.post('/auth/register' , register)
app.get('/auth/user_session', userSession)
app.delete('/auth/logout', logout)
app.post('/api/login', login)
app.get('/api/inventory', (req, res, next) => {
    const db =req.app.get('db')
    db.query('SELECT * FROM inventory').then(inventory => {
        res.status(200).send(inventory)
    })
})

let port = SERVER_PORT || 4000;
app.listen(port, () => console.log(`hearin you out on ${port}`))