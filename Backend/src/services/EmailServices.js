require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text, html) => {
  try {
    const response = await resend.emails.send({
      from: "Bharat Bazar <onboarding@resend.dev>",
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent successfully");
    console.log(response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendEmail };