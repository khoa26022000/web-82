const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect("url");
    console.log("Connected successfully to server");
  } catch (error) {
    console.log("Connectd error:", error);
  }
}

module.exports = connectToDB;
