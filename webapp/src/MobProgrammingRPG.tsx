import React, { useEffect, useState } from "react";
import PlayerDisplay from "./PlayerDisplay";
import { Game } from "./model/Game";
import TimerDisplay from "./TimerDisplay";
import { RealClock } from "./infrastructure/RealClock";
import { roles } from "./model/Roles";
import RoleDescriptionView from "./RoleDescriptionView";
import { Clock } from "./model/Clock";
import { useLocalStorageGame } from "./infrastructure/UseLocalStorageGame";
import { useWsGame } from "./infrastructure/UseWsGame";

type MobProgrammingRPGProps = {
    startingPlayers?: string[];
    rotateAfter?: number;
    clock?: Clock;
    wsServer?: string,
    wsReconnect?: boolean,
    gameId?: string
}

const MobProgrammingRPG = (
    {
        startingPlayers = [],
        rotateAfter = 60 * 4,
        clock = new RealClock(),
        wsServer = "ws://localhost:8080",
        wsReconnect = false,
        gameId
    }: MobProgrammingRPGProps
) => {
    const [game, setGame, gameRef] = useWsGame(useLocalStorageGame(
        gameId,
        Game.withPlayers(startingPlayers, rotateAfter, gameId)
    ), wsServer, wsReconnect);

    const [uiState, setUiState] = useState({showSettings: false, showWhoIsNext: false, timeIsOver: false});

    // todo refactor
    useEffect(() => {
        function path() {
            return window.location.pathname.replace(/\/+$/, '');
        }

        if (path() === process.env.PUBLIC_URL) {
            const url = path() + '/' + game.id();
            window.history.pushState('id', 'Title', url);
        }
        // eslint-disable-next-line
    }, [])

    function toggleSettings() {
        setUiState({...uiState, showSettings: !uiState.showSettings});
    }

    function changePlayers(event): void {
        const players = new FormData(event.target).get("change-players") as string;
        gameRef.current.setPlayers(players);
        updateGameState();
        event.preventDefault();
    }

    function rotate() {
        gameRef.current.rotate();
        updateGameState();
    }

    function updateGameState() {
        setGame(gameRef.current.clone());
    }

    function timeOver() {
        gameRef.current.stopTimer();
        rotate();
        explainWhoIsNext();
    }

    function explainWhoIsNext() {
        setUiState({...uiState, showWhoIsNext: true, timeIsOver: true});
    }

    function toggleHelp() {
        setUiState({...uiState, showWhoIsNext: !uiState.showWhoIsNext, timeIsOver: false});
    }

    function closeWhoIsNext() {
        setUiState({...uiState, showWhoIsNext: false});
    }

    function continuePlaying() {
        closeWhoIsNext()
        gameRef.current.startTimer();
        updateGameState();
    }

    return (
        <div className="rpgui-container framed full">
            <h1>
                Mob Programming RPG
                <img className="logo" alt="logo" src={process.env.PUBLIC_URL + "/favicon.png"}/>
            </h1>
            <ul aria-label="Player List" className="rpgui-container-framed flex-box">
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
                    rotateAfter={game.timer()}
                    status={game.timerStatus()}
                    clock={clock}
                    onFinish={timeOver}
                    onStart={continuePlaying}
                />
            </div>
            {uiState.showWhoIsNext &&
              <div className="help-overlay rpgui-container framed-golden-2">
                  {uiState.timeIsOver &&
                    <>
                      <h2>Time is over</h2>
                      <h3 title="Next Driver"><span className="yellow">{game.driver()}</span>, you're the next Driver
                      </h3>
                      <h3 title="Next Navigator"><span className="yellow">{game.navigator()}</span>, you're the next
                        Navigator</h3>
                    </>
                  }
                  {!uiState.timeIsOver &&
                    <>
                      <h2>This is how you gain XP:</h2>
                    </>
                  }
                <div className="flex-box">
                    {Object.entries(roles).map(it => <RoleDescriptionView key={it[0]} roleDetails={it[1]}/>)}
                </div>

                <br className="clear-left"/>
                <button className="rpgui-button golden close-button" onClick={closeWhoIsNext}>
                  <p>Close</p>
                </button>
              </div>
            }

            {uiState.showSettings &&
              <div className="rpgui-container framed-golden settings">
                <form onSubmit={changePlayers}>
                  <label>Change Players
                    <textarea id="change-players" name="change-players"
                              defaultValue={game.playerNames()}></textarea>
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
