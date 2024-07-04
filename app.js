import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public")); 

app.get("/", (req, res) => {
    res.render("index")
})

io.on("connection", (socket) => {

    socket.on("send-location", (data) => {
        io.emit("receive-location", {id: socket.id, ...data});
    })

    socket.on("disconnect", () => {
        io.emit("user-disconnect", socket.id);
        console.log("user-disconnected")
    })
    console.log("connected", socket.id);
})


server.listen(port, () => {
    console.log("server listening on " + port);
})


