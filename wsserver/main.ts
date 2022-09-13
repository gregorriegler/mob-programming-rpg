import { WebSocketServer } from "ws";
import { WSServer } from "./WSServer";
import * as Https from "https";
import * as fs from "fs";

const httpsServer = Https.createServer({
    cert: fs.readFileSync('certificate.crt'),
    key: process.env.PRIVATE_KEY
})
const wss = new WebSocketServer({
    server: httpsServer,
})

new WSServer(wss);

httpsServer.listen(process.env.PORT ? parseInt(process.env.PORT) : 8080)

console.log("WS Server running");

// // Authorize Certificate
// import * as Http from "http";
// const httpServer = Http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end(`97E6C78FB6FA12A557FC46B04C221BE3AF3E0DAEDDE916032348D73C57CB2F0D
// comodoca.com
// 50a437712d4f433
// `)
// })
// httpServer.listen(process.env.PORT ? parseInt(process.env.PORT) : 8080)
