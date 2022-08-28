import React, { useState } from "react";
import PlayerDisplay from "./PlayerDisplay";

const MobProgrammingRPG = ({startingPlayers = []}) => {

    const [gameState, setGameState] = useState({players: startingPlayers, showSettings: false})

    function showSettings() {
        setGameState({...gameState, showSettings: !gameState.showSettings})
    }

    function changePlayers(event): void {
        event.preventDefault();
        const players = new FormData(event.target).get("change-players") as String;
        const playerArray = players.split(',')
            .map(player => player.trim())
            .filter(it => it !== "");
        setGameState({...gameState, players: playerArray})
    }

    return (
        <>
            <h1>Mob Programming RPG</h1>
            <ul aria-label="Player List">
                {gameState.players.map((player) => <PlayerDisplay playerName={player} key={player}/>)}
            </ul>
            <button onClick={() => showSettings()}>Settings</button>
            {gameState.showSettings &&
              <form onSubmit={changePlayers}>
                <label>Change Players
                  <textarea id="change-players" name="change-players"
                            defaultValue={gameState.players.join(", ")}></textarea>
                </label>
                <button type="submit">Save</button>
              </form>
            }
        </>
    );
};

export default MobProgrammingRPG;