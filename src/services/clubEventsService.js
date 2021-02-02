const connectionDB = require('./databaseService');
const ClubEvent = require('../../ClubEvent');

const clubEventsService = {

    async getUpcomingEvents(limit) {
        const connection = await connectionDB.getDBConnection();

        let query = 'SELECT * FROM events WHERE deleted = false ORDER BY id ASC';

        if (limit) {
            query += ` LIMIT ${limit}`;
        }

        const [rows, fields] = await connection.query(query);

        const clubEvents = rows.map (row => {
            const clubEvent = new ClubEvent(row.id, row.day, row.month, row.year, row.name, row.place, row.url);

            return clubEvent;
        })
        
        return clubEvents;
    },

    async addClubEvent(day, month, year, name, place, url) {
        const connection = await connectionDB.getDBConnection();

        let query = 'INSERT INTO events (deleted, day, month, year, name, place, url) VALUES(false, ?, ?, ?, ?, ?, ?)';

        await connection.query(query, 
        [day, month, year, name, place, url]);
    },

    async deleteClubEvent(id) {
        const connection = await connectionDB.getDBConnection();

        let query = 'UPDATE events SET deleted = true WHERE id = ?';

        await connection.query(query, [id]);
    },

    async getClubEvent(id) {
        const connection = await connectionDB.getDBConnection();

        let query = 'SELECT * from events WHERE id = ?';

        const [rows, fields] = await connection.query(query, [id]);

        // codigo repetido por todos lados
        return new ClubEvent(id, rows[0].day, rows[0].month, rows[0].year, rows[0].name, rows[0].place, rows[0].url);
    },

    async editClubEvent(id, day, month, year, name, place, url) {

        const connection = await connectionDB.getDBConnection();

        const clubEvent = new ClubEvent(
            id,
            day,
            month,
            year,
            name,
            place,
            url
        );

        let query = 'UPDATE events SET day = ?, month = ?, year = ?, name = ?, place = ?, url = ?  WHERE id = ?';
    
        await connection.query(query, 
        [clubEvent.getDay(), clubEvent.getMonth(), clubEvent.getYear(), clubEvent.getName(), clubEvent.getPlace(), clubEvent.getUrl(), id]);

    }

    
};

module.exports = clubEventsService;