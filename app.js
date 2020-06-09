const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const login = require('./routers/login');
const logout = require('./routers/logout');
const edit = require('./routers/edit');
const profile = require('./routers/profile');
const register = require('./routers/register');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.text());
app.use(express.static('public'));

// useing routes
app.use('/login', login)
app.use('/logout', logout)
app.use('/saveEdit', edit)
app.use('/profile', profile)
app.use('/register', register)

app.set("view engine", "ejs");

// get not found page
app.get('*', function (req, res) {
  res.status(404).send('not found');
});



app.listen(3030);
console.log('server is listening');