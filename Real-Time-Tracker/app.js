const express = require("express");
const app = express();
const http = require("http");
const { dirname } = require("path");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const path = require('path');

app.set('view engine', "ejs");
app.set('views', path.resolve("./views"));
    
io.on("connection", (socket) => {
    socket.on("Sendlocation", function (data) {
        io.emit("ReceieveLocation", {id: socket.id, ...data});
    })

    socket.on("disconnect",function(){
        io.emit("user-disconnected", socket.id);
    })
    console.log(socket.id);
    console.log("Connected");
})

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req,res) => {
    return res.render("index")
});

server.listen(7310);