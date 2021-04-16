
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const path = require('path');

require('dotenv').config();

const serveStatic = require ('serve-static');

const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passportLocal = require('passport-local').Strategy;
const loadRoutes = require('./routes');

//settings
app.use(express.urlencoded( {extended: true} ));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(serveStatic(__dirname + '/../public'));

app.use(cookieParser(process.env.SELWYN_SESSION_SECRET));

app.use(session({secret: process.env.SELWYN_SESSION_SECRET, saveUninitialized: true, resave: true, 
  cookie: { 
    expires: new Date(Date.now() + 60 * 10000), 
    maxAge: 60*10000
}}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(function(username, password, done){

    if(username === process.env.SELWYN_LOGIN_USERNAME && password === process.env.SELWYN_LOGIN_PASSWORD) 
    return done(null, {id: 1, name: 'Admin'});

    done(null, false);
}))

passport.serializeUser(function(user, done){
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    done(null, {id: 1, name: 'Admin'});
})

loadRoutes(app);

app.listen(process.env.SELWYN_WEB_PORT);