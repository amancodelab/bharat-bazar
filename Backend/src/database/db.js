require("dotenv").config();
const mongoose = require("mongoose");

const connectToDb = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected successfully!!!!")
  }
  catch (error) {
    console.log(`Error:${error}`);
    console.log("Failed to Connected to Database !!!!");
    process.exit(1);
  }
}

module.exports = connectToDb;