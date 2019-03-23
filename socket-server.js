var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require("socket.io")(server);

io.on("connection", client => {
    console.log("Client Connected");
    client.emit("acknowledge", {message : "You are connected."})
    client.on("msgToServer", (chatterName, msg) => {
        console.log(chatterName + " says : " + msg);
        client.broadcast.emit("serverMsg", chatterName, msg)
        client.emit("serverMsg", 'Me' ,msg)
    })

    client.on("disconnect", ()=>{
        // Message to be saved in Mongo
    })
})

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/socket-client.html")
})

server.listen(3000, ()=>{
    console.log("Socket server running on Port 3000");
})