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
        return response.status(400).send('Invalid password');
    }
    if (!request.body.displayName) {
        return response.status(400).send('Invalid display name');
    }
    if (!request.body.contactNo) {
        return response.status(400).send('Invalid contactNo');
    }
    if (!request.body.firstName) {
        return response.status(400).send('Invalid firstName');
    }
    if (!request.body.lastName) {
        return response.status(400).send('Invalid lastName');
    }
    if (!request.body.fullName) {
        return response.status(400).send('Invalid fullName');
    }
    if (!request.body.isAttendee) {
        return response.status(400).send('Invalid isAttendee');
    }
    if (!request.body.roleName) {
        return response.status(400).send('Invalid roleName');
    }
    if (!request.body.address) {
        return response.status(400).send('Invalid address');
    }
    return admin.auth().createUser({
        email: request.body.userEmail,
        emailVerified: false,
        password: request.body.password,
        displayName: request.body.displayName,
        disabled: false
    })
        .then((userRecord) => {
            console.log("Successfully created new user:", userRecord.uid);
            let attendeeDetails = { 
                address: request.body.address, 
                contactNo: request.body.contactNo, 
                email:request.body.userEmail,
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                fullName:request.body.fullName,
                roleName:request.body.roleName,
                isAttendee:request.body.isAttendee,
            };
            return sendWelcomeEmail(request.body.userEmail, request.body.displayName, response, request.body.password, attendeeDetails, userRecord.uid);
        })
        .catch((error) => {
            console.log("Error creating new user:", error);
            return response.status(500).send("Error creating new user:");
        });
});

function sendWelcomeEmail(email, displayName, response, password, attendeeDetails, uid) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
    };

    // The user subscribed to the newsletter.
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName || ''}! Thank you for your registration at ${APP_NAME}. Your password for login is '${password}'.`;
    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New welcome email sent to:', email);
        return admin.firestore().collection("Attendee1").doc(uid)
            .set(attendeeDetails)
            .then((docRef) => {
                console.log('Attendde added', attendeeDetails);
                return response.status(200).send("Successfully created new user.");
            })
            .catch((ex) => {
                console.log('Error Adding Attendee', ex);
                return response.status(500).send("Error updating attendance table for user:" + email);
            });
    }).catch((error) => {
        console.log("Error sending mail to user:", error);
        return response.status(500).send("Error sending mail to user:" + email);
    });
}
