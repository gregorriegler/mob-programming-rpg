import { WebSocketServer } from "ws";
import { WSServer } from "./WSServer";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const wss = new WebSocketServer({
    port: PORT
})
new WSServer(wss)

console.log("WS Server running");
