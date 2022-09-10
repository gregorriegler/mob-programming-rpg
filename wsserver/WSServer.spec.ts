import { WebSocket, WebSocketServer } from "ws";
import { WSServer } from "./WSServer";

describe('WSServer', () => {

    const port = 1337;
    let wss: WebSocketServer;
    let sut: WSServer;

    beforeEach(() => {
        new Promise((resolve, reject) => {
            wss = new WebSocket.Server({port}, () => {
                resolve(true);
            });
            sut = new WSServer(wss);
        });
    })

    it('hands over a game', (done) => {
        const receiverWs = new WebSocket(`ws://localhost:${port}`);
        const senderWs = new WebSocket(`ws://localhost:${port}`);
        receiverWs.on('open', () => {
            receiverWs.send(JSON.stringify({command: 'subscribe', id: '1'}))
            receiverWs.onmessage = (message) => {
                expect(message.data).toEqual(JSON.stringify({id: '1', players:['1']}))
                receiverWs.close()
                senderWs.close()
                wss.close(done)
                done()
            }
        });
        senderWs.on('open', () => {
            senderWs.send(JSON.stringify({command: 'save', game: {id: '1', players:['1']}}))
        })
    });
});