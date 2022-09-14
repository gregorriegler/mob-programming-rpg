import { useEffect, useRef } from "react";
import { Game } from "../model/Game";

export const useWsGame = ([game, setGame], wsServer, wsReconnect) => {
    const gameRef = useRef(game);
    const ws = useRef(null as WebSocket | null);
    const wsReconnectIntervalId = useRef(null as NodeJS.Timer | null);

    useEffect(() => {
        function connectWs() {
            if (ws.current) return;
            ws.current = new WebSocket(wsServer);
            ws.current.onopen = async () => {
                if (wsReconnectIntervalId.current !== null) {
                    clearInterval(wsReconnectIntervalId.current!!);
                    wsReconnectIntervalId.current = null;
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
                if (wsReconnectIntervalId.current === null && wsReconnect) {
                    console.log("start reconnect interval")
                    wsReconnectIntervalId.current = setInterval(connectWs, 1000);
                }
                ws.current = null;
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