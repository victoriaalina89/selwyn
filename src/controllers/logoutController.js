

const logoutController = {

    async displayLogout(request, response) {
        
        request.session.destroy(function (err) {
            response.redirect('/'); 
           });
    }

};

module.exports = logoutController;