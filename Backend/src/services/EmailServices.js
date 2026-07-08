require("dotenv").config();

const sendEmail = async (to, subject, text, html) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Bharat Bazar",
          email: process.env.BREVO_SENDER,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: html,
        textContent: text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    console.log("✅ Email sent");
    console.log(data);
  } catch (error) {
    console.error("❌ Brevo API Error:");
    console.error(error);
    throw error;
  }
};

module.exports = { sendEmail };