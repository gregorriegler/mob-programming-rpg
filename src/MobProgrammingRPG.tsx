import React, { useState } from "react";
import PlayerDisplay from "./PlayerDisplay";
import { Game } from "./model/Game";
import TimerDisplay from "./TimerDisplay";
import { RealClock } from "./RealClock";

const MobProgrammingRPG = ({startingPlayers = [], rotateAfter = 60*4, clock = new RealClock()}) => {
    const [game, setGame] = useState(new Game(startingPlayers));
    const [uiState, setUiState] = useState({showSettings: false, showWhoIsNext: false});

    function showSettings() {
        setUiState({...uiState, showSettings:  !uiState.showSettings});
    }

    function changePlayers(event): void {
        event.preventDefault();
        const players = new FormData(event.target).get("change-players") as string;
        game.setPlayers(players);
        setGame(Object.create(game))
    }

    function rotate() {
        game.rotate();
        setGame(Object.create(game))
    }
    
    function explainWhoIsNext() {
        rotate();
        setUiState({...uiState, showWhoIsNext: true});
    }

    return (
        <>
            <h1>Mob Programming RPG</h1>
            <ul aria-label="Player List">
                {game.players().map((player) => <PlayerDisplay playerName={player}
                                                                         role={game.roleOf(player)}
                                                                         key={player}/>)}
            </ul>
            <button onClick={() => showSettings()}>Settings</button>
            <button onClick={() => rotate()}>Rotate</button>
            
            <TimerDisplay rotateAfter={rotateAfter} clock={clock} onFinish={explainWhoIsNext}/>

            {uiState.showWhoIsNext && 
              <div>
                <span title="Driver">Driver: {game.driver()}</span>
                <span title="Navigator">Navigator: {game.navigator()}</span>
                <span title="Next">Next: {game.next()}</span>
              </div>
            }
            
            {uiState.showSettings &&
              <form onSubmit={changePlayers}>
                <label>Change Players
                  <textarea id="change-players" name="change-players"
                            defaultValue={game.players().join(", ")}></textarea>
                </label>
                <button type="submit">Save</button>
              </form>
            }
        </>
    );
};

export default MobProgrammingRPG;
