const adminLoginController = {

    async displayAdminLogin(request, response) {
        
        response.render("login.ejs");
    }

};

module.exports = adminLoginController;