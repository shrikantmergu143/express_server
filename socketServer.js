// const registerSocketServer = (server) =>{
//   const io = require("socket.io")(server, {
//     cors:{
//       origin:"*",
//       methods:["GET", "POST"],
//     },
//   });
//   io.on("connection", (socket)=>{
//     console.log("user connected");
//     console.log("socket.id", socket.id);
//   })
// }
const WebSocket = require('ws');

const registerSocketServer = (server) =>{
  const socketServer = new WebSocket.Server({server});

  socketServer.on('connection', (socket) => {
    console.log('New client connected');
  });
}


module.exports = {
  registerSocketServer
}