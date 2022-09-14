import { useEffect, useRef } from "react";
import { Game } from "../model/Game";

export const useWsGame = ([game, setGame], wsServer, wsReconnect) => {
    const gameRef = useRef(game);
    const ws = useRef<WebSocket>();
    const reconnectInterval = useRef<NodeJS.Timer>();

    useEffect(() => {
        function connectWs() {
            if (ws.current) return;
            ws.current = new WebSocket(wsServer);
            ws.current.onopen = async () => {
                if (reconnectInterval.current) {
                    clearInterval(reconnectInterval.current!!);
                    reconnectInterval.current = undefined;
                }
                if (ws.current) {
                    ws.current.send(JSON.stringify({"command": "subscribe", "id": gameRef.current.id()}));
                }
            }
            ws.current.onmessage = e => {
                gameRef.current = Game.fromJSON(e.data)
                setGame(gameRef.current);
            };
            ws.current.onerror = (error) => console.log("ws error", error);
            ws.current.onclose = _ => {
                if (reconnectInterval.current === undefined && wsReconnect) {
                    console.log("start reconnect interval")
                    reconnectInterval.current = setInterval(connectWs, 1000);
                }
                ws.current = undefined;
            };
        }

        connectWs();
        // eslint-disable-next-line
    }, []);

    function sendGameState() {
        if (ws.current?.readyState !== 1) return;
        const message = {
            command: "save",
            game: JSON.parse(gameRef.current.toJSON())
        }
        ws.current?.send(JSON.stringify(message));
    }

    const setAndSendGame = function (game) {
        setGame(game);
        sendGameState();
    }
    return [game, setAndSendGame, gameRef];
}