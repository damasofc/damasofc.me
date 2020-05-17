const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const sendgridTransport = require('nodemailer-sendgrid-transport');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_user: 'damasofc',    // SG username
        api_key: 'Dafcjordan2*', // SG password
      },
    })
  );


exports.answerEmail = functions.firestore
    .document(`email/{docId}`)
    .onCreate((change, context) => {
        const dataMail = change.data();
        
        const mailOptions = {
            from: 'no-reply@damasofc.me',
            to: dataMail.fromEmail,
            subject: 'damasofc.me: answer', // email subject
            html: `<div>I will contact you soon, thank you for your interest in my services <br /> God Bless You, <br /> Damaso F.</div>
            ` // email content in HTML
        };

        return transporter.sendMail(mailOptions,(erro,info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        })
    })