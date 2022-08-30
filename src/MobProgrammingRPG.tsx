import React, { useState } from "react";
import PlayerDisplay from "./PlayerDisplay";
import { Game } from "./model/Game";
import TimerDisplay from "./TimerDisplay";
import { RealClock } from "./RealClock";

const MobProgrammingRPG = ({startingPlayers = [], clock = new RealClock()}) => {
    // TODO: separate ui from game state?
    const [gameState, setGameState] = useState({game: new Game(startingPlayers), showSettings: false});
    const [showWhoIsNext, setShowWhoIsNext] = useState(false);

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
    
    function explainWhoIsNext() {
        rotate();
        setShowWhoIsNext(true);
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
            
            <TimerDisplay clock={clock} onFinish={explainWhoIsNext}/>

            {showWhoIsNext && 
              <div>
                <span title="Driver">Driver: {gameState.game.driver()}</span>
                <span title="Navigator">Navigator: {gameState.game.navigator()}</span>
                <span title="Next">Next: {gameState.game.next()}</span>
              </div>
            }
            
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