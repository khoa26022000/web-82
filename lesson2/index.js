const express = require("express");
const router = require("./router");
const app = express();
const connectToDB = require("./database/index");

const port = 3000;

app.use(express.json());
app.use(router);
connectToDB();

app.listen(port, () => {
  console.log("Server is running!");
});
