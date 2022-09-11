import React, { useEffect, useRef, useState } from "react";
import PlayerDisplay from "./PlayerDisplay";
import { Game } from "./model/Game";
import TimerDisplay from "./TimerDisplay";
import { RealClock } from "./RealClock";
import { roles } from "./model/Roles";
import RoleDescriptionView from "./RoleDescriptionView";
import { Clock } from "./model/Clock";
import { gameIdFromUrl } from "./GameIdFromUrl";

const useLocalStorageGame: (gameId, defaultGame) => [Game, React.Dispatch<React.SetStateAction<Game>>] = (gameId, defaultGame) => {

    function initialState() {
        if (gameId === undefined) return defaultGame;
        const json = localStorage.getItem(gameId);
        if (json !== null) {
            return Game.fromJSON(json);
        } else {
            return defaultGame;
        }
    }

    const [game, setGame] = useState(initialState());

    useEffect(() => {
        localStorage.setItem(game.id(), game.toJSON());
    }, [game]);

    return [game, setGame];
};

type MobProgrammingRPGProps = {
    startingPlayers?: string[];
    rotateAfter?: number;
    clock?: Clock;
    wsServer?: string
}


const MobProgrammingRPG = (
    {
        startingPlayers = [],
        rotateAfter = 60 * 4,
        clock = new RealClock(),
        wsServer = 'ws://mob-programming-rpg-server.herokuapp.com/'
    }: MobProgrammingRPGProps
) => {
    const [game, setGame] = useLocalStorageGame(
        gameIdFromUrl(), 
        Game.withPlayers(startingPlayers, rotateAfter, gameIdFromUrl())
    );
    const gameRef = useRef(game);
    const ws = useRef(null as WebSocket | null);

    const [uiState, setUiState] = useState({showSettings: false, showWhoIsNext: false, timeIsOver: false});

    useEffect(() => {
        ws.current = new WebSocket(wsServer);
        ws.current.onopen = async () => {
            ws.current!!.send(JSON.stringify({"command": "subscribe", "id": gameRef.current.id()}));
        }
        ws.current.onmessage = e => {
            gameRef.current = Game.fromJSON(e.data)
            updateGameState();
        };
        ws.current.onerror = (error) => console.log("ws error", error);
        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
        // eslint-disable-next-line
    }, []);

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

    async function sendGameState() {
        if (ws.current?.readyState !== 1) return;
        const parse = JSON.parse(gameRef.current.toJSON());
        const message = {
            command: "save",
            game: parse
        }

        ws.current?.send(JSON.stringify(message));
    }

    function updateGameState() {
        setGame(gameRef.current.clone());
        sendGameState().then(_ => {});
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
                    rotateAfter={game.timer()}
                    status={game.timerStatus()}
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
                  {Object.entries(roles).map(it => <RoleDescriptionView key={it[0]} roleDetails={it[1]}/>)}

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
