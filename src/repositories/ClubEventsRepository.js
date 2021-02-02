const connectionDB = require('../services/databaseService');
const ClubEvent = require('../../ClubEvent');

const clubEventsrepository = {

    async getAllEvents(limit) {
        const connection = await connectionDB.getDBConnection();
        let query = 'SELECT * FROM events WHERE deleted = false ORDER BY id ASC';

        if (limit) {
            query += ` LIMIT ${limit}`;
        }

        const [rows, fields] = await connection.query(query);

        return rows;
    },

    async createEvent(day, month, year, name, place, url) {
        const connection = await connectionDB.getDBConnection();

        let query = 'INSERT INTO events (deleted, day, month, year, name, place, url) VALUES(false, ?, ?, ?, ?, ?, ?)';

        await connection.query(query, 
        [day, month, year, name, place, url]);
        
    },

    async updateEventSetDeletedTrue(id) {
        const connection = await connectionDB.getDBConnection();

        let query = 'UPDATE events SET deleted = true WHERE id = ?';

        await connection.query(query, [id]);
        
    },

    async selectEventWhereId(id) {
        const connection = await connectionDB.getDBConnection();

        let query = 'SELECT * from events WHERE id = ?';

        const [rows, fields] = await connection.query(query, [id]);
        
        return rows;
    },

    async updateEvent(id, day, month, year, name, place, url){
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
}

module.exports = clubEventsrepository;