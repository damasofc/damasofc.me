const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const sgMail = require("@sendgrid/mail");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.answerEmail = functions.firestore
    .document(`mail/{docId}`)
    .onCreate((change, context) => {
        const dataMail = change.data();
        
        const mailOptions = {
            from: 'damasofc@unitec.edu',
            to: dataMail.fromEmail,
            subject: 'damasofc.me: answer', // email subject
            html: `<div>I will contact you soon, thank you for your interest in my services <br /> God Bless You, <br /> Damaso F.</div>
            ` // email content in HTML
        };
        return admin.firestore().doc('data/sendGrid').get().then(snap => {
            sgMail.setApiKey(snap.data().api_key)
            return sgMail.send(mailOptions);
        }).catch((err) => {
            return err
        })
    })