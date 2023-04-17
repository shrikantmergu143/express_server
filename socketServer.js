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
const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");

const WebSocket = require('ws');

const registerSocketServer = (server) =>{
  const socketServer = new WebSocket.Server({server});

  socketServer.on('connection', (socket, req) => {
    const upgradeHeader = (req.headers.upgrade || '').split(',').map((s) => s.trim())
    // socket.use((data, next) => {
    //   // logic here
    //   authSocket(data, next);
    // });
        const response = authSocket.validateToken(socket, req)
    if(response !== "NOT_AUTHORIZED"){
      newConnectionHandler(socket, socketServer);
      // console.log("response", response)
      socket.send(JSON.stringify(response));
    }else{
      socket.close();
    }
  });
}


module.exports = {
  registerSocketServer
}