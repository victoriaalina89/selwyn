const adminLoginController = {
    
    async displayAdminLogin(request, response) {
        response.render("login.ejs");
    },

    async displayEventsImagesButtons(request, response) {
      response.render("admin.ejs");
    }
    
};

module.exports = adminLoginController;