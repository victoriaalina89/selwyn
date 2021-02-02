const clubEventsService = require("../services/clubEventsService")

const clubInfoController = {

    async displayClubInfo(requiere, response) {

        response.render('clubInfo.ejs');
        
    }
}

module.exports = clubInfoController;