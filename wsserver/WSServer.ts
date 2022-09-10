import { WebSocket, WebSocketServer } from "ws";

type GameId = string;
type ClientId = string;

interface Message {
    command: "save" | "subscribe"
    game?: any
    id?: any
}

export class WSServer {
    allClients = new Map<ClientId, WebSocket>();
    saveGames = new Map<GameId, any>();
    gameClients = new Map<GameId, Set<ClientId>>();

    constructor(wss: WebSocketServer) {
        wss.on("connection", ws => {
            const clientId = this.generateId();
            this.allClients.set(clientId, ws);
            console.log("new client connected");
            // sending message
            ws.on("message", data => {
                const message: Message = JSON.parse(data.toString());
                console.log("received message from", clientId, message);
                if (message.command === "subscribe") {
                    console.log("subscribing", message.id);
                    if (!this.gameClients.has(message.id)) {
                        console.log("does not have set yet")
                        this.gameClients.set(message.id, new Set())
                    }
                    this.gameClients.get(message.id)!!.add(clientId)

                    if (this.saveGames.has(message.id)) {
                        const gameState = JSON.stringify(this.saveGames.get(message.id));
                        console.log("sending", gameState);
                        ws.send(gameState)
                    }
                } else if (message.command === "save") {
                    this.saveGame(clientId, message, message.game);

                    console.log("gameClients", this.gameClients.get(message.game.id))
                    console.log("allClients", this.allClients.keys())
                }
            });
            // handling what to do when clients disconnects from server
            ws.on("close", () => {
                this.allClients.delete(clientId);
            });
            // handling client connection error
            ws.onerror = function () {
                console.log("Some Error occurred")
            }
        });
    }

    generateId() {
        return Math.random().toString(36).replace('0.', '');
    }

    saveGame(clientId: string, message: Message, game: any) {
        console.log("save game");
        if (JSON.stringify(game) === JSON.stringify(this.saveGames.get(game.id))) {
            console.log("nothing changed")
            return;
        }
        this.saveGames.set(game.id, game);

        const gameClients = this.gameClients.get(game.id) || [];
        console.log("gameClients", gameClients)

        gameClients!!.forEach(c => {
            if (clientId === c) return;
            if (!this.allClients.has(c)) {
                this.gameClients.get(game.id)!!.delete(c)
                return;
            }
            const webSocket = this.allClients.get(c);
            webSocket!!.send(JSON.stringify(game));
        });
    }
}