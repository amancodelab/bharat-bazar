require("dotenv").config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CILENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log(`Error connecting to Email server:${error.message}`);
  } else {
    console.error("Email server is ready to send the message");
  }
})

// to send the Email

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `Bharat bazar <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });

    console.log(`Message sent:${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email:`, error);
  }
}

module.exports = { transporter, sendEmail };
