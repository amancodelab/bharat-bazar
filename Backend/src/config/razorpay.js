require('dotenv').config();

const Razorpay = require('razorpay');



const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEYID,
  key_secret: process.env.RAZORPAY_KEYSECRET
});

module.exports = razorpayInstance;