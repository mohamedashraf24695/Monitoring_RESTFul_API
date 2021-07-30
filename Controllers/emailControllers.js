var nodemailer = require("nodemailer");


async function sendEmail(reciever, subject, message) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "mohamedashraf246950@gmail.com",
    to: reciever,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}




module.exports = {
    sendEmail:sendEmail
}