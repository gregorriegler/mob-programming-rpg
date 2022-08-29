import React, { useState } from "react";
import PlayerDisplay from "./PlayerDisplay";
import { Game } from "./model/Game";

const MobProgrammingRPG = ({startingPlayers = []}) => {
    // TODO: separate ui from game state?
    const [gameState, setGameState] = useState({game: new Game(startingPlayers), showSettings: false})

    function showSettings() {
        setGameState({...gameState, showSettings: !gameState.showSettings})
    }

    function changePlayers(event): void {
        event.preventDefault();
        const players = new FormData(event.target).get("change-players") as string;
        gameState.game.setPlayers(players);
        setGameState({...gameState, game: Object.create(gameState.game)})
    }

    function rotate() {
        gameState.game.rotate();
        setGameState({...gameState, game: Object.create(gameState.game)})
    }

    return (
        <>
            <h1>Mob Programming RPG</h1>
            <ul aria-label="Player List">
                {gameState.game.players().map((player) => <PlayerDisplay playerName={player} role={gameState.game.roleOf(player)} key={player}/>)}
            </ul>
            <button onClick={() => showSettings()}>Settings</button>
            <button onClick={() => rotate()}>Rotate</button>
            {gameState.showSettings &&
              <form onSubmit={changePlayers}>
                <label>Change Players
                  <textarea id="change-players" name="change-players"
                            defaultValue={gameState.game.players().join(", ")}></textarea>
                </label>
                <button type="submit">Save</button>
              </form>
            }
        </>
    );
};

export default MobProgrammingRPG;