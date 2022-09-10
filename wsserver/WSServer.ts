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
            this.registerClient(ws);
        });
    }

    private registerClient(ws: WebSocket) {
        const clientId = this.generateId();
        this.allClients.set(clientId, ws);
        ws.on("message", data => {
            this.handleMessage(clientId, JSON.parse(data.toString()), ws);
        });
        ws.on("close", () => {
            this.allClients.delete(clientId);
        });
        ws.onerror = e => {
            console.log("Some Error occurred", e)
        }
    }

    generateId() {
        return Math.random().toString(36).replace('0.', '');
    }

    private handleMessage(clientId: string, message: Message, ws: WebSocket) {
        if (message.command === "subscribe") {
            this.handleSubscribe(message, clientId);
        } else if (message.command === "save") {
            this.handleSaveGame(clientId, message.game);
        }
    }

    private handleSubscribe(message: Message, clientId: string) {
        this.addClientToGame(clientId, message.id);
        this.sendCurrentGameStateToClient(clientId, message.id);
    }

    private addClientToGame(clientId: string, gameId: any) {
        if (!this.gameClients.has(gameId)) {
            this.gameClients.set(gameId, new Set())
        }
        this.gameClients.get(gameId)!!.add(clientId)
    }

    private sendCurrentGameStateToClient(clientId: string, gameId: any) {
        if (this.saveGames.has(gameId)) {
            const gameState = JSON.stringify(this.saveGames.get(gameId));
            this.sendToClient(clientId, gameState)
        }
    }

    private handleSaveGame(savingClientId: string, game: any) {
        if (this.gameIsUnchanged(game)) {
            return;
        }
        this.saveGames.set(game.id, game);
        this.broadCastGameState(game, savingClientId);
    }

    private broadCastGameState(game: any, skipClientId: string) {
        const gameClients = this.getGameClients(game.id);
        gameClients.forEach(clientId => {
            if (skipClientId === clientId) return;
            if (!this.allClients.has(clientId)) {
                gameClients.delete(clientId);
                return;
            }
            this.sendToClient(clientId, JSON.stringify(game));
        });
    }

    private sendToClient(clientId: string, game: string) {
        const socket = this.allClients.get(clientId);
        if (socket) socket.send(game);
    }

    private getGameClients(gameId: any) {
        return this.gameClients.get(gameId) || new Set();
    }

    private gameIsUnchanged(game: any) {
        return JSON.stringify(game) === JSON.stringify(this.saveGames.get(game.id));
    }
}