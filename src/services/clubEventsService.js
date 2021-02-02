
const ClubEvent = require('../../ClubEvent');
const clubEventsRepository = require('../repositories/ClubEventsRepository');

const clubEventsService = {

    async getUpcomingEvents(limit) {

        let rows = await clubEventsRepository.getAllEvents(limit);

        const clubEvents = rows.map (row => {
            const clubEvent = new ClubEvent(row.id, row.day, row.month, row.year, row.name, row.place, row.url);

            return clubEvent;
        })
        
        return clubEvents;
    },

    async addClubEvent(day, month, year, name, place, url) {

        await clubEventsRepository.createEvent(day, month, year, name, place, url);

    },

    async deleteClubEvent(id) {

        await clubEventsRepository.updateEventSetDeletedTrue(id);

    },

    async getClubEvent(id) {

        let rows = await clubEventsRepository.selectEventWhereId(id);

        return new ClubEvent(id, rows[0].day, rows[0].month, rows[0].year, rows[0].name, rows[0].place, rows[0].url);
    },

    async editClubEvent(id, day, month, year, name, place, url) {

        await clubEventsRepository.updateEvent(id, day, month, year, name, place, url);

    }

    
};

module.exports = clubEventsService;