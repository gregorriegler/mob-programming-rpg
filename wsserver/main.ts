import { WebSocketServer } from "ws";
import { WSServer } from "./WSServer";

const wss = new WebSocketServer({port: 80})
new WSServer(wss)

console.log("WS Server running");
