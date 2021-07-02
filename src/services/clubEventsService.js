
const ClubEvent = require('../classes/ClubEvent');
const clubEventsRepository = require('../repositories/ClubEventsRepository');


const clubEventsService = {

    async getUpcomingEvents(limit) {

        let rows = await clubEventsRepository.getAllEvents(limit);

        const clubEvents = rows.map (row => {

          const formattedDate = formattedClubDate(row.date);

          const clubEvent = new ClubEvent(row.id, formattedDate, row.name, row.place, row.url);

          return clubEvent;
        })
        
      return clubEvents;
    },

    async addClubEvent(date, name, place, url) {

      await clubEventsRepository.createEvent(date, name, place, url);

    },

    async deleteClubEvent(id) {

      await clubEventsRepository.updateEventSetDeletedTrue(id);

    },

    async getClubEvent(id) {

      let rows = await clubEventsRepository.selectEventWhereId(id);

      const date = new Date(rows[0].date);
      const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
      const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
      const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
      const  formattedDate = `${year}-${month}-${day}`;

      return new ClubEvent(id, formattedDate, rows[0].name, rows[0].place, rows[0].url);
    },

    async editClubEvent(id, date, name, place, url) {


      await clubEventsRepository.updateEvent(id, date, name, place, url);

    }
    
};

function formattedClubDate(clubEventDate) {

  const date = new Date(clubEventDate);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  const  formattedDate = `${day} ${month} ${year}`;


  return formattedDate;
}


module.exports = clubEventsService;