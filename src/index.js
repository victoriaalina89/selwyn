

// const DBConnection = require("./DBConnection");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

require('dotenv').config();

const serveStatic = require ('serve-static');
const basicAuth = require('express-basic-auth');

const mysql = require('mysql2/promise');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const multer = require('multer');
const upload = multer();

const Event = require('../Event');
const session = require('express-session');
const { request } = require('express');


//settings
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(serveStatic(__dirname + '/../public'));

app.use(basicAuth({
    users: { 'selwyn': 'selwyn2016' },
    challenge: true,
}));


app.use(session({secret: 'selwyn2016',saveUninitialized: true,resave: true}));

const sessionChecker = (request, response, next) => {
    if (request.session.admin) {
        next();
    } else {
        response.redirect('/');
    }    
};


app.get("/", async (require, response) => {

    const connection = await getDBConnection();

    const [rows, fields] = await connection.query('SELECT * from events');

    const events = rows.map (event => {
        const newEvent = new Event(event.id, event.day, event.month, event.year, event.name, event.place, event.url);

        if(event.deleted) {
            newEvent.markAsDeleted();
        }

        return newEvent;
    })

    const eventsNotDeleted = events.filter(event => {
        return event.deleted === false;
    });


    response.render("index.ejs", {events: eventsNotDeleted});
});

app.get("/about-us", (require, response) => {
    response.render("aboutUs.ejs");
});

app.get('/admin/login', (request, response) => {
    

    response.render('login.ejs');
})

app.post('/admin/login', urlencodedParser, (request,response) => {
    console.log(request.body);
    
    if(request.body.username === "admin" && request.body.password === "admin") {
        request.session.admin = true;
       
        response.redirect('/admin/events-list');
        var hour = 300000;
        request.session.cookie.expires = new Date(Date.now() + hour)
        request.session.cookie.maxAge = hour
        } else {
        response.redirect('/');
        }
    
    
    
})

app.get('/admin/events-list', sessionChecker, async (request, response) => {
    // if (request.session.admin) {
        // return next();
        

    const connection = await getDBConnection();

    const [rows, fields] = await connection.query("SELECT * FROM events");

    console.log(rows);

    const events = rows.map(event => {
        const newEvent = new Event(event.id, event.day, event.month, event.year, event.name, event.place, event.url);
        if(event.deleted) {
            newEvent.markAsDeleted();
        }

        return newEvent
    })

    const eventsNotDeleted = events.filter(event => {
        return event.deleted === false;
    })

    response.render('eventsList.ejs', {events: eventsNotDeleted});
// }else {
        
//     response.redirect('/');
//     }
    
})

app.get('/admin/add-event', sessionChecker, (request, response) => {

    // if (request.session.admin) {
    response.render('addEvent.ejs')
    // }else {
        
    // response.redirect('/');
    // }
}) 

app.post('/admin/add-event', upload.none(), async (request, response) => {

    const connection = await getDBConnection();

    await connection.query('INSERT INTO events (deleted, day, month, year, name, place, url) VALUES(false, ?, ?, ?, ?, ?, ?)', 
    [request.body.day, request.body.month, request.body.year, request.body.name, request.body.place, request.body.url]);

    console.log(request.body.place);

    response.redirect('/admin/events-list');
})

app.get('/admin/delete-event/:id', urlencodedParser, sessionChecker, async (request, response) => {

    // if (request.session.admin) {
    request.params.id;

    const connection = await getDBConnection();

    await connection.query('UPDATE events SET deleted = true WHERE id = ?', [request.params.id]);

    response.redirect('/admin/events-list');
    // }else {
        
    // response.redirect('/');
    // }
})

app.get('/admin/edit-event/:id', sessionChecker, async (request,response) => {
    // if (request.session.admin) {

    request.params.id;

    const connection = await mysql.createConnection({
        host: process.env.SELWYN_DB_HOST,
        port: process.env.SELWYN_DB_PORT,
        user: process.env.SELWYN_DB_USER,
        password: process.env.SELWYN_DB_PASS,
        database: process.env.SELWYN_DB_DATABASE
    });

    const [rows, fields] = await connection.query('SELECT * from events WHERE id = ?', [request.params.id]);

   const newEvent = new Event(request.params.id, rows[0].day, rows[0].month, rows[0].year, rows[0].name, rows[0].place, rows[0].url);

    response.render('editEvent.ejs', {eventId: newEvent.getId(), eventDay: newEvent.getDay(), eventMonth: newEvent.getMonth(), eventYear: newEvent.getYear(),
    eventName: newEvent.getName(), eventPlace: newEvent.getPlace(), eventUrl: newEvent.getUrl() });

    // }else {
        
    // response.redirect('/');
    // }
})

app.post('/admin/edit-event/:id', urlencodedParser, upload.none(), async (request, response) => {

    request.params.id;

    const connection = await getDBConnection();

    const [rows, fields] = await connection.query('SELECT * from events WHERE id = ?', [request.params.id]);

    const newEvent = new Event(request.params.id, request.body.day, request.body.month, request.body.year,
     request.body.name, request.body.place, request.body.url);

    if(rows[0].day !== newEvent.getDay()) {
        await connection.query('UPDATE events SET day = ? WHERE id = ?', [newEvent.getDay(), request.params.id]);
    }

    if(rows[0].month !== newEvent.getMonth()) {
        await connection.query('UPDATE events SET month = ? WHERE id = ?', [newEvent.getMonth(), request.params.id]);
    }

    if(rows[0].year !== newEvent.getYear()) {
        await connection.query('UPDATE events SET year = ? WHERE id = ?', [newEvent.getYear(), request.params.id]);
    }

    if(rows[0].name !== newEvent.getName()) {
        await connection.query('UPDATE events SET name = ? WHERE id = ?', [newEvent.getName(), request.params.id]);
    }

    if(rows[0].place !== newEvent.getPlace()) {
        await connection.query('UPDATE events SET place = ? WHERE id = ?', [newEvent.getPlace(), request.params.id]);
    }

    if(rows[0].url !== newEvent.getUrl()) {
        await connection.query('UPDATE events SET url = ? WHERE id = ?', [newEvent.getUrl(), request.params.id]);
    }

    response.redirect('/admin/events-list');
    
})

app.get('/club-info', (request, response) => {
    response.render('clubInfo.ejs');
})

app.get('/gallery', (request, response) => {
    response.render('gallery.ejs');
})


app.listen(process.env.SELWYN_WEB_PORT);

async function getDBConnection() {
    const connection = await mysql.createConnection({
        host: process.env.SELWYN_DB_HOST,
        port: process.env.SELWYN_DB_PORT,
        user: process.env.SELWYN_DB_USER,
        password: process.env.SELWYN_DB_PASS,
        database: process.env.SELWYN_DB_DATABASE
    });

    return connection;
}
