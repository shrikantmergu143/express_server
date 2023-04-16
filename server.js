const express = require("express");
const http = require("http");
const cors = require("cors");
// const { MongoClient, ServerApiVersion } = require('mongodb');
const authRoutes = require("./routes/authRoutes");
const mongoose = require('mongoose');
require('dotenv').config();

const  LogRocket = require('logrocket');
LogRocket.init('g4jqmy/express_server');

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

//Register
app.use("/api/auth", authRoutes);

const server = http.createServer(app);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
    server.listen(PORT, ()=>{
        console.log("Serverport", PORT);
    });
})
  .catch(error => console.error(error));

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.MONGO_URL, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         // await client.db("admin").command({ ping: 1 });
//         server.listen(PORT, ()=>{
//             console.log("Serverport", PORT);
//         });
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.error);