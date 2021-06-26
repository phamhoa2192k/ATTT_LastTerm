const express = require('express')
var app = express()
const cookieParser = require('cookie-parser');
app.use(cookieParser('210920'));
var logoutRoute = require('./routes/logout')
var indexRoute = require('./routes/index')
var loginRoute = require('./routes/login')
var loginWithExtension = require('./routes/login-with-extension')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())

app.use("/", indexRoute)
app.use("/login", loginRoute)
app.use("/login-with-extension", loginWithExtension)
app.use("/logout", logoutRoute)
app.listen(3000)