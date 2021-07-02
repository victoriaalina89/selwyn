const clubEventsService = require('../services/clubEventsService');

const homeController = {

    async displayHome(request, response) {

        const upcomingEvents = await clubEventsService.getUpcomingEvents(5);
        
        response.render("noAdmin/index.ejs", {events: upcomingEvents});
    }

};

module.exports = homeController;