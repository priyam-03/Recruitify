const nodeMailer = require("nodemailer");
console.log(process.env.SMPT_PORT);
const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.SMPT_PORT,
    secure: false,
    service: "gmail",
    auth: {
      user: "priyam.saha2003@gmail.com",
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: "priyam.saha2003@gmail.com",
    to: options.mail,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
