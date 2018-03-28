const functions = require('firebase-functions');
var admin = require("firebase-admin");
const nodemailer = require('nodemailer');
var serviceAccount = require('./tie-app.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://tie-con-management.firebaseio.com'
});

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: '',
    },
});

const APP_NAME = 'TiECON Pune';

exports.registerUser = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        return response.status(403).send('Forbidden!');
    }

    if (!request.body.userEmail) {
        return response.status(400).send('Invalid user email');
    }
    if (!request.body.password) {
        return response.send('Invalid password');
    }
    if (!request.body.phoneNumber) {
        return response.status(400).send('Invalid phone number');
    }
    if (!request.body.displayName) {
        return response.send('Invalid display name');
    }

    return admin.auth().createUser({
        email: request.body.userEmail,
        emailVerified: false,
        password: request.body.password,
        displayName: request.body.displayNamed,
        disabled: false
    })
        .then((userRecord) => {
            console.log("Successfully created new user:", userRecord.uid);
            return sendWelcomeEmail(request.body.userEmail, request.body.displayNamed, response, request.body.password);
        })
        .catch((error) => {
            console.log("Error creating new user:", error);
            return response.status(500).send("Error creating new user:");
        });
});

function sendWelcomeEmail(email, displayName, response, password) {
    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: email,
    };
  
    // The user subscribed to the newsletter.
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName || ''}! Thank you for your registration at ${APP_NAME}. Your password for login is '${password}'.`;
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New welcome email sent to:', email);
      return response.status(200).send("Successfully created new user");
    }).catch((error) => {
        console.log("Error sending mail to user:", error);
        return response.status(500).send("Error sending mail to user:" + email);
    });
  }
