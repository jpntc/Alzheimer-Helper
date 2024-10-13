// const nodemailer = require("nodemailer");
const nodemailer = require('nodemailer'); //(after npm install)

async function main(to, subject, score) {
// Async function enables allows handling of promises with await

  // First, define send settings by creating a new transporter:
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: "mumysee@gmail.com", // Your email address
      pass: "rdxm kgge rcdz pvzs", // Password (for gmail, your app password)
    },
  });

  var txt = "I hope you are doing well. " + subject + " has recently scored " + score + " on their Alzheimer's test.";

  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  let info = await transporter.sendMail({
    from: '"You" <mumysee@gmail.com>',
    to: to,
    subject: "Hello, update on " + subject + "'s health.'",
    text: txt,
  });

  console.log(info.messageId); // Random ID generated after successful send (optional)
}

module.exports = {
  main
}
