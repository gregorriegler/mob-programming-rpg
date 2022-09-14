import { Game } from "../model/Game";
import React, { useEffect, useState } from "react";

export const useLocalStorageGame: (gameId, defaultGame) => [Game, React.Dispatch<React.SetStateAction<Game>>] = (gameId, defaultGame) => {

    function initialState() {
        if (gameId === undefined) return defaultGame;
        const json = localStorage.getItem(gameId);
        return json !== null ? Game.fromJSON(json) : defaultGame;
    }

    const [game, setGame] = useState(initialState());

    useEffect(() => {
        localStorage.setItem(game.id(), game.toJSON());
    }, [game]);

    return [game, setGame];
};