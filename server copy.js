const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 8080;

const url = 'mongodb+srv://shrikantmergu143:shrikantmergu1999@cluster0.lt2r86f.mongodb.net/?retryWrites=true&w=majority';


const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

mongoose
  .connect(url)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed. Server not started");
    console.error(err);
  });
