import { Game } from "../model/Game";
import React, { useEffect, useState } from "react";

export const useLocalStorageGame: (initGame) => [Game, React.Dispatch<React.SetStateAction<Game>>] = (initGame) => {

    function initialState() {
        if (initGame.id() === undefined) return initGame;
        const json = localStorage.getItem(initGame.id());
        return json !== null ? Game.fromJSON(json) : initGame;
    }

    const [game, setGame] = useState(initialState());

    useEffect(() => {
        localStorage.setItem(game.id(), game.toJSON());
    }, [game]);

    return [game, setGame];
};