const express = require ('express');
const app = express();
const serveStatic = require ('serve-static');




//setings
app.set('port', 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

//static files
app.use(serveStatic(__dirname + '/public'));

// app.use(session({
//     resave: true, 
//     saveUninitialized: true,
//     secret: 'secret'
// }));

//routes

app.get("/", (require, response) => {
    response.render("index.ejs")
})


//listening the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})