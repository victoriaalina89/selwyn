const adminLoginController = {
    
    async displayAdminLogin(request, response) {
        response.render("admin/login.ejs");
    },

    async displayEventsImagesButtons(request, response) {
      response.render("admin/admin.ejs");
    }
    
};

module.exports = adminLoginController;