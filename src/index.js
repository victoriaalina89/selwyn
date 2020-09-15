const express = require ('express');
const app = express();
const serveStatic = require ('serve-static');
const basicAuth = require('express-basic-auth');
const { response } = require('express');

//setings
app.set('port', 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(serveStatic(__dirname + '/../public'));

app.use(basicAuth({
    users: { 'selwyn': 'selwyn2016' },
    challenge: true,
}));

app.get("/", (require, response) => {
    response.render("index.ejs");
});

app.get("/about-us", (require, response) => {
    response.render("aboutUs.ejs");
});

//listening the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});