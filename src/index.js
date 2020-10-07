const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const serveStatic = require ('serve-static');
const basicAuth = require('express-basic-auth');

const mysql = require('mysql2/promise');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const multer = require('multer');
const upload = multer();

const Event = require('../Event');
// const { urlencoded } = require('body-parser');
// const { request } = require('express');
const session = require('express-session');


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

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');        
//     }
//     next();
// });

const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
    } else {
        next();
    }    
};



app.get("/", async (require, response) => {

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "usuario",
        password: "password",
        database: "selwyn"
    });

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

app.get('/admin/login', sessionChecker, (request, response) => {

    response.render('login.ejs');
})

app.post('/admin/login', upload.none(), (request,response) => {

    response.redirect('/admin/events-list');
    
})

app.get('/admin/events-list', async (request, response) => {

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "usuario",
        password: "password",
        database: "selwyn"
    })

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
})

app.get('/admin/add-event', (request, response) => {
    response.render('addEvent.ejs')
}) 

app.post('/admin/add-event', upload.none(), async (request, response) => {

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "usuario",
        password: "password",
        database: "selwyn"
    })

    await connection.query('INSERT INTO events (deleted, day, month, year, name, place, url) VALUES(false, ?, ?, ?, ?, ?, ?)', 
    [request.body.day, request.body.month, request.body.year, request.body.name, request.body.place, request.body.url]);

    console.log(request.body.place);

    response.redirect('/admin/events-list');
})

app.get('/admin/delete-event/:id', urlencodedParser, async (request, response) => {
    request.params.id;

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "usuario",
        password: "password",
        database: "selwyn"
    });

    await connection.query('UPDATE events SET deleted = true WHERE id = ?', [request.params.id]);

    response.redirect('/admin/events-list');
})

app.get('/admin/edit-event/:id', async (request,response) => {

    request.params.id;

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "usuario",
        password: "password",
        database: "selwyn"
    });

    const [rows, fields] = await connection.query('SELECT * from events WHERE id = ?', [request.params.id]);

   const newEvent = new Event(request.params.id, rows[0].day, rows[0].month, rows[0].year, rows[0].name, rows[0].place, rows[0].url);

    response.render('editEvent.ejs', {eventId: newEvent.getId(), eventDay: newEvent.getDay(), eventMonth: newEvent.getMonth(), eventYear: newEvent.getYear(),
    eventName: newEvent.getName(), eventPlace: newEvent.getPlace(), eventUrl: newEvent.getUrl() });
})

app.post('/admin/edit-event/:id', urlencodedParser, upload.none(), async (request, response) => {

    request.params.id;

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "usuario",
        password: "password",
        database: "selwyn"
    });

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

//listening the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});