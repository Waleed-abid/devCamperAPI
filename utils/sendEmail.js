const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "99d030e930e1af",
      pass: "d33141bd823d5d",
    },
  });

  let message = {
    from: "noreply@devcamper.io",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);
};

module.exports = sendEmail;
