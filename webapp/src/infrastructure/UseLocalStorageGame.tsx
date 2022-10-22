import { Game } from "../model/Game";
import React, { useEffect, useState } from "react";

export const useLocalStorageGame: (defaultGame) => [Game, React.Dispatch<React.SetStateAction<Game>>] = (defaultGame) => {

    function initialState() {
        if (defaultGame.id() === undefined) return defaultGame;
        const json = localStorage.getItem(defaultGame.id());
        return json !== null ? Game.fromJSON(json) : defaultGame;
    }

    const [game, setGame] = useState(initialState());

    useEffect(() => {
        localStorage.setItem(game.id(), game.toJSON());
    }, [game]);

    return [game, setGame];
};