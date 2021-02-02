const axios = require("axios");

const contactUsService = {

    async sendEmail(name, phone, email, subject, message) {

        const mailContent =`
        <p>You have a new message</p>
        <h3>contact details</h3>
        <ul>
        <li>Name: ${name}</li>
        <li>Phone: ${phone}</li>
        <li>Email: ${email}</li>
        </ul>
        <h3>Message</h3>
        <p>Subject: ${subject}</p>
        <p> ${message}</p>
        `

        axios({
            method: 'post',
            url: 'https://api.sendinblue.com/v3/smtp/email',
            headers: {
                'api-key': process.env.SENDINBLUE_APIKEY
            },
            data: {  
                "sender": {  
                "name":"Selwyn - Contact Form",
                "email": process.env.SELWYN_EMAIL
                },
                "to": [{  
                    "email":process.env.SELWYN_EMAIL,
                    "name":"Selwyn team"
                }],
                "subject": "New message - Contact Form",
                "htmlContent": mailContent
            }
        });

    }
}

module.exports = contactUsService;