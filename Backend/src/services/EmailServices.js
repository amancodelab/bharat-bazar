require("dotenv").config();
const nodemailer = require("nodemailer");
console.log("🔥 EmailServices.js loaded");
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {

    const info = await transporter.sendMail({
      from: `Bharat Bazar <${process.env.BREVO_SENDER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email Error:");
    console.error(error);
    throw error;
  }
};

module.exports = { sendEmail };