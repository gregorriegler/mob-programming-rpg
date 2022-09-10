import { WebSocketServer } from "ws";
import { WSServer } from "./WSServer";

const wss = new WebSocketServer({
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080
})
new WSServer(wss)

console.log("WS Server running");
