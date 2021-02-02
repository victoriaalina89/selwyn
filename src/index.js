
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

const serveStatic = require ('serve-static');

const session = require('express-session');

const loadRoutes = require('./routes');
const { response } = require('express');


//settings
app.use(bodyParser.json());

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(serveStatic(__dirname + '/../public'));

// app.use(basicAuth({
//     users: { 'selwyn': process.env.SELWYN_SESSION_SECRET },
//     challenge: true,
// }));

app.use(session({secret: process.env.SELWYN_SESSION_SECRET, saveUninitialized: true, resave: true,  cookie: {
    expires: 300000
}}));

/* const sessionChecker = require('./sessionChecker'); */

/* const sessionChecker = (request, response, next) => {
    if (request.session.admin) {
        next();
    } else {
        response.redirect('/');
    }    
}; */

loadRoutes(app);



app.listen(process.env.SELWYN_WEB_PORT);