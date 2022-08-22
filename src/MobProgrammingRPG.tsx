import React, { useState } from "react";
import Player from "./Player";

const MobProgrammingRPG = ({startingPlayers = []}) => {

    const [gameState, setGameState] = useState({players: startingPlayers, showSettings: false})

    function showSettings() {
        setGameState({...gameState, showSettings: !gameState.showSettings})
    }

    function changePlayers(event): void {
        event.preventDefault();
        const formData = new FormData(event.target);
        const players = formData.get("change-players") as String;
        const playerArray = players.split(',')
            .map(player => player.trim())
            .filter(it => it !== "");
        setGameState({...gameState, players: playerArray})
    }

    return (
        <>
            <h1>Mob Programming RPG</h1>
            <ul aria-label="Player List">
                {gameState.players.map((player) => <Player playerName={player} key={player}/>)}
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

