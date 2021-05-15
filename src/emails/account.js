const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: `${email}`,
        from: 'parveen.sahrawat1209@gmail.com',
        subject: 'Welcome',
        text: `Welcome to the app, ${name}. Please let us know how did you get here.`,
    });
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: `${email}`,
        from: 'parveen.sahrawat1209@gmail.com',
        subject: 'Goodbye',
        text: `Goodbye ${name}. Hope to see you soon.`,
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}