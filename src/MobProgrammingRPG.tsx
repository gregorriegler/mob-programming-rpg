import React, { useState } from "react";
import PlayerDisplay from "./PlayerDisplay";
import { Game } from "./model/Game";
import TimerDisplay from "./TimerDisplay";
import { RealClock } from "./RealClock";

const MobProgrammingRPG = ({startingPlayers = [], rotateAfter = 60*4, clock = new RealClock()}) => {
    const [gameState, setGameState] = useState({game: new Game(startingPlayers)});
    const [uiState, setUiState] = useState({showSettings: false, showWhoIsNext: false});

    function showSettings() {
        setUiState({...uiState, showSettings:  !uiState.showSettings});
    }

    function changePlayers(event): void {
        event.preventDefault();
        const players = new FormData(event.target).get("change-players") as string;
        gameState.game.setPlayers(players);
        setGameState({game: Object.create(gameState.game)})
    }

    function rotate() {
        gameState.game.rotate();
        setGameState({game: Object.create(gameState.game)})
    }
    
    function explainWhoIsNext() {
        rotate();
        setUiState({...uiState, showWhoIsNext: true});
    }

    return (
        <>
            <h1>Mob Programming RPG</h1>
            <ul aria-label="Player List">
                {gameState.game.players().map((player) => <PlayerDisplay playerName={player}
                                                                         role={gameState.game.roleOf(player)}
                                                                         key={player}/>)}
            </ul>
            <button onClick={() => showSettings()}>Settings</button>
            <button onClick={() => rotate()}>Rotate</button>
            
            <TimerDisplay rotateAfter={rotateAfter} clock={clock} onFinish={explainWhoIsNext}/>

            {uiState.showWhoIsNext && 
              <div>
                <span title="Driver">Driver: {gameState.game.driver()}</span>
                <span title="Navigator">Navigator: {gameState.game.navigator()}</span>
                <span title="Next">Next: {gameState.game.next()}</span>
              </div>
            }
            
            {uiState.showSettings &&
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
