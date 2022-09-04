import React, { useEffect, useState } from "react";
import PlayerDisplay from "./PlayerDisplay";
import { Game } from "./model/Game";
import TimerDisplay from "./TimerDisplay";
import { RealClock } from "./RealClock";

const useLocalStorageGame: (defaultGame) => [Game, React.Dispatch<React.SetStateAction<Game>>] = (defaultGame) => {
    function initialState() {
        const json = localStorage.getItem("game");
        if (json !== null) {
            return Game.fromJSON(json);
        } else {
            return defaultGame;
        }
    }

    const [game, setGame] = useState(initialState());

    useEffect(() => {
        localStorage.setItem("game", game.toJSON());
    }, [game]);

    return [game, setGame];
};


const MobProgrammingRPG = (
    {
        startingPlayers = [],
        rotateAfter = 60 * 4,
        clock = new RealClock()
    }
) => {
    const [game, setGame] = useLocalStorageGame(Game.withPlayers(startingPlayers));
    const [uiState, setUiState] = useState({showSettings: false, showWhoIsNext: false, timeIsOver: false});

    function toggleSettings() {
        setUiState({...uiState, showSettings: !uiState.showSettings});
    }

    function changePlayers(event): void {
        const players = new FormData(event.target).get("change-players") as string;
        game.setPlayers(players);
        updateGameState();
        event.preventDefault();
    }

    function rotate() {
        game.rotate();
        updateGameState();
    }

    function updateGameState() {
        setGame(game.clone());
    }

    function timeOver() {
        rotate();
        explainWhoIsNext();
    }

    function explainWhoIsNext() {
        setUiState({...uiState, showWhoIsNext: true, timeIsOver: true});
    }

    function toggleHelp() {
        setUiState({...uiState, showWhoIsNext: !uiState.showWhoIsNext, timeIsOver: false});
    }

    function continuePlaying() {
        setUiState({...uiState, showWhoIsNext: false});
    }

    return (
        <div className="rpgui-container framed full">
            <h1>
                Mob Programming RPG
                <img className="logo" alt="logo" src={process.env.PUBLIC_URL + "/favicon.png"}/>
            </h1>
            <ul aria-label="Player List" className="rpgui-container-framed">
                {game.players().map((player) =>
                    <PlayerDisplay
                        player={player}
                        role={game.roleOf(player.name())}
                        updateGameState={updateGameState}
                        key={player.name()}
                    />
                )}
            </ul>
            <div className="rpgui-container framed-grey buttons">
                <button className="rpgui-button" onClick={toggleSettings}><p>Settings</p></button>
                <button className="rpgui-button" onClick={toggleHelp}><p>Help</p></button>
                <button className="rpgui-button" onClick={rotate}><p>Rotate</p></button>
                <TimerDisplay
                    rotateAfter={rotateAfter}
                    clock={clock}
                    onFinish={timeOver}
                    continuePlaying={continuePlaying}
                />
            </div>
            {uiState.showWhoIsNext &&
              <div className="help-overlay rpgui-container framed-golden-2">
                  {uiState.timeIsOver &&
                    <>
                      <h2>Time is over</h2>
                      <h3>Next up</h3>
                    </>
                  }
                  {!uiState.timeIsOver &&
                    <>
                      <h2>This is how you gain XP:</h2>
                    </>
                  }
                <section className="role-description rpgui-container framed-golden">
                  <h4 title="Driver"><span className="yellow">{game.driver()}</span>, you're the Driver</h4>
                  <p>
                    A master of your tools, and a quiet professional, you're here to get the team rapidly through every red, green, and refactoring.
                  </p>

                  <p>
                    Mark XP Whenever you...
                  </p>
                  <ul>
                    <li>Ask a clarifying question about what to type</li>
                    <li>Type something you disagree with</li>
                    <li>Use a new keyboard shortcut</li>
                    <li>Learn something new about tooling</li>
                    <li>Ignore a direct instruction from someone who isn't the Navigator</li>
                  </ul>
                </section>
                <section className="role-description rpgui-container framed-golden">
                  <h4 title="Navigator"><span className="yellow">{game.navigator()}</span>, you're the Navigator</h4>
                  <p>
                    Brick by brick you build in the darkness. Every step you take brings you closer, as you sift the wisdom of the mob.
                  </p>

                  <p>
                    Mark XP Whenever you...
                  </p>
                  <ul>
                    <li>Ask for ideas</li>
                    <li>Filter the mob's ideas then tell the Driver what to type</li>
                    <li>Tell the Driver only your high-level intent and have them implement the details</li>
                    <li>Create a failing test. Make it pass. Refactor.</li>
                  </ul>
                </section>
                <section className="role-description rpgui-container framed-golden">
                  <h4 title="Mobber"><span className="yellow">Everyone else</span>, you're Mobbers</h4>
                  <p>
                    Shoulder to shoulder with the best, your relaxed manner belies what you know to be true: nothing can stop this mob to set sail
                  </p>

                  <p>
                    Mark XP Whenever you...
                  </p>
                  <ul>
                    <li>Yield to the less privileged voice</li>
                    <li>Contribute an idea</li>
                    <li>Ask questions till you understand</li>
                    <li>Listen on the edge of your seat</li>
                  </ul>
                </section>
                
                <br className="clear-left"/>
                <button className="rpgui-button golden close-button" onClick={continuePlaying}>
                  <p>Close</p>
                </button>
              </div>
            }

            {uiState.showSettings &&
              <div className="rpgui-container framed-golden settings">
                <form onSubmit={changePlayers}>
                  <label>Change Players
                    <textarea id="change-players" name="change-players"
                              defaultValue={game.players().map(it => it.name()).join(", ")}></textarea>
                  </label>
                  <button type="submit" className="rpgui-button"><p>Save</p></button>
                  <button className="rpgui-button" onClick={toggleSettings}><p>Close</p></button>
                </form>
              </div>
            }
        </div>
    );
};

export default MobProgrammingRPG;
