const adminLoginController = {

    async displayAdminLogin(request, response) {
        
        response.render("login.ejs");
    },

    async postAdminLogin(request, response) {
        if(request.body.username === process.env.SELWYN_LOGIN_USERNAME && request.body.password === process.env.SELWYN_LOGIN_PASSWORD) {
            request.session.admin = true;
           
            response.redirect('/admin/events-list');
            
        } 
        response.redirect('/admin/login');
        
    }

};

module.exports = adminLoginController;