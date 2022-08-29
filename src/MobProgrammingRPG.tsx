import React, { useState } from "react";
import PlayerDisplay from "./PlayerDisplay";
import { Game } from "./model/Game";

const MobProgrammingRPG = ({startingPlayers = []}) => {
    const game = new Game();
    game.setPlayers(startingPlayers);
    // TODO: separate ui from game state?
    const [gameState, setGameState] = useState({game: game, showSettings: false})

    function showSettings() {
        setGameState({...gameState, showSettings: !gameState.showSettings})
    }

    function changePlayers(event): void {
        event.preventDefault();
        const players = new FormData(event.target).get("change-players") as string;
        gameState.game.setPlayers(players);
        setGameState({...gameState, game: Object.create(gameState.game)})
    }

    return (
        <>
            <h1>Mob Programming RPG</h1>
            <ul aria-label="Player List">
                {gameState.game.players().map((player) => <PlayerDisplay playerName={player} role={game.roleOf(player)} key={player}/>)}
            </ul>
            <button onClick={() => showSettings()}>Settings</button>
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