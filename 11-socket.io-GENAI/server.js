import { Socket } from 'dgram'
import app from './src/app.js'
import {createServer} from 'http'
import {Server} from "socket.io"


const httpServer=createServer(app)
const io =new Server(httpServer,{})

io.on("connection",(socket)=>{
    console.log("new connection created")
    socket.on("message",(msg)=>{
        console.log("user fired message event")
        console.log(msg)
        io.emit("abc")
    })
})
//io.on("connection") -> A user connected
//socket.emit,socket.broadcast().emit(),io.emit()
// socket.om()-> Listen
//socket.emit()-> send to on user
//io.emit()->  sebd to everyone
//socket.breadcast().emit()->  send to everyone exext sender 

httpServer.listen(3000,()=>{
    console.log("server is running on port 3000")
})