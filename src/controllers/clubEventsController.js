const clubEventsService = require('../services/clubEventsService');

const clubEventsController = {

    async displayEvents(request, response) {

        const allEvents = await clubEventsService.getUpcomingEvents();
        
        response.render("noAdmin/events.ejs", {events: allEvents, currentPage: "events"});
    },

    async displayAdminEvents(request, response) {

        const allEvents = await clubEventsService.getUpcomingEvents();
        
        response.render('admin/events/eventsList.ejs', {events: allEvents});
    },

    async displayAddEvent(request, response) {

        response.render('admin/events/addEvent.ejs')
    },

    
    async addClubEvent(request, response) {

        await clubEventsService.addClubEvent(
          request.body.date,
          request.body.name,
          request.body.place,
          request.body.url
        );
    
        response.redirect('/admin/events-list');
    },
    
    async deleteClubEvent(request, response) {

        await clubEventsService.deleteClubEvent(request.params.id);

        response.redirect('/admin/events-list');

    },

    async getClubEvent(request, response) {

        const clubEvent = await clubEventsService.getClubEvent(request.params.id);

        response.render('admin/events/editEvent.ejs', {
            eventId: clubEvent.getId(),
            eventDate: clubEvent.getDate(),
            eventName: clubEvent.getName(),
            eventPlace: clubEvent.getPlace(),
            eventUrl: clubEvent.getUrl()
        });
    },

    async editClubEvent(request, response) {

        await clubEventsService.editClubEvent(
          request.params.id,
          request.body.date,
          request.body.name,
          request.body.place,
          request.body.url
        );
        
        response.redirect('/admin/events-list');

    }

};

module.exports = clubEventsController;