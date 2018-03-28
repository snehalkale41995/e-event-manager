const functions = require('firebase-functions');
var admin = require("firebase-admin");
var serviceAccount = require('./tie-app.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tie-con-management.firebaseio.com'
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
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
        return response.status(200).send("Successfully created new user:");
    })
    .catch((error) => {
        console.log("Error creating new user:", error);
        return response.status(500).send("Error creating new user:");
    });
});
