const contactUsService = require('../services/contactUsService');

const contactUsController = {

    async displayContactUs (request, response) {

        response.render('contactForm.ejs');

    },

    async sendEmail(request, response) {

       await contactUsService.sendEmail(request.body.name, request.body.phone, request.body.email, request.body.subject, request.body.message) 

       response.render('formSubmited.ejs',{ 
        name: request.body.name,
        phone: request.body.phone,
        subject: request.body.subject,
        email: request.body.email, 
        message: request.body.message
    });
    }
}

module.exports = contactUsController;