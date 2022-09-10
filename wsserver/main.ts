import { WebSocket, WebSocketServer } from "ws";

type GameId = string;
type ClientId = string;

interface Message {
    command: "save" | "load"
    game?: any
    id?: any
}

const allClients = new Map<ClientId, WebSocket>();
const saveGames = new Map<GameId, any>();
const gameClients = new Map<GameId, Set<ClientId>>();

function generateId() {
    return Math.random().toString(36).replace('0.', '');
}

const wss = new WebSocketServer({port: 8080})

function saveGame(clientId: string, message: Message, game: any) {
    console.log("save game");
    if(JSON.stringify(game) === JSON.stringify(saveGames.get(game.id))) {
        console.log("nothing changed")
        return;
    }
    saveGames.set(game.id, game);
    // if (!gameClients.has(message.game.id)) {
    //     console.log("does not have set yet")
    //     gameClients.set(message.game.id, new Set())
    // }
    // console.log("clients", clients)
    // clients.add(clientId);

    gameClients.get(game.id)!!.forEach(c => {
        if (clientId === c) return;
        if (!allClients.has(c)) {
            gameClients.get(game.id)!!.delete(c)
        }
        const webSocket = allClients.get(c);
        webSocket!!.send(JSON.stringify(game));
    });
}

wss.on("connection", ws => {
    const clientId = generateId();
    allClients.set(clientId, ws);
    console.log("new client connected");
    // sending message
    ws.on("message", data => {
        const message: Message = JSON.parse(data.toString());
        console.log("received message from", clientId, message);
        if (message.command === "load") {
            console.log("loading", message.id);
            if (!gameClients.has(message.id)) {
                console.log("does not have set yet")
                gameClients.set(message.id, new Set())
            }
            gameClients.get(message.id)!!.add(clientId)
            
            if (saveGames.has(message.id)) {
                const gameState = JSON.stringify(saveGames.get(message.id));
                console.log("sending", gameState);
                ws.send(gameState)
            }
        } else if (message.command === "save") {
            saveGame(clientId, message, message.game);

            // gameClients.get(message.game.id)!!.forEach(c => {
            //   if (clientId === c) return;
            //   clients.get(c)!!.send(saveGames.get(message.game.id));
            //   console.log("sending updates");
            // });

            console.log("gameClients", gameClients.get(message.game.id))
            console.log("allClients", allClients.keys())
        }
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
        allClients.delete(clientId);
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

console.log("WS Server running");
