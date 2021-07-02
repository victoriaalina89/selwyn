

const clubInfoController = {

    async displayClubInfo(request, response) {

        response.render('noAdmin/clubInfo.ejs');
        
    }
}

module.exports = clubInfoController;