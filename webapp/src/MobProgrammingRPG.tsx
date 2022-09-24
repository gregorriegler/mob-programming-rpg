import React, {useEffect, useState} from "react";
import PlayerDisplay from "./PlayerDisplay";
import {Game} from "./model/Game";
import TimerDisplay from "./TimerDisplay";
import {RealClock} from "./infrastructure/RealClock";
import {Clock} from "./model/Clock";
import {useLocalStorageGame} from "./infrastructure/UseLocalStorageGame";
import {useWsGame} from "./infrastructure/UseWsGame";
import {addGameIdToUrl, noGameIdInUrl} from "./infrastructure/GameIdFromUrl";
import {AddPlayerForm} from "./AddPlayerForm";
import {About} from "./About";
import {Help} from "./Help";

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

    const [uiState, setUiState] = useState({
        showAddPlayerForm: false,
        showSettings: false,
        showHelp: false,
        showAbout: false,
        timeIsOver: false,
    });

    useEffect(() => {
        if (noGameIdInUrl()) {
            addGameIdToUrl(game.id());
        }
        // eslint-disable-next-line
    }, [])

    const updateGameState = () => {
        setGame(gameRef.current.clone());
    };

    const submitSettingsForm = (event): void => {
        const formData = new FormData(event.target);
        const players = formData.get("change-players") as string;
        const timer = formData.get("change-timer") as string;
        gameRef.current.setPlayers(players);
        gameRef.current.changeTimer(parseInt(timer) * 60);
        updateGameState();
        event.preventDefault();
    };

    const addPlayer = (playerName: string, avatar: string) => {
        gameRef.current.addPlayer(playerName, avatar);
        updateGameState();
        hideAddPlayerForm();
    };

    const rotate = () => {
        gameRef.current.rotate();
        updateGameState();
    };

    const timeOver = () => {
        gameRef.current.stopTimer();
        rotate();
        explainWhoIsNext();
    };

    const continuePlaying = () => {
        closeHelp()
        gameRef.current.startTimer();
        updateGameState();
    };

    function toggleSettings() {
        setUiState({...uiState, showSettings: !uiState.showSettings});
    }

    function showAddPlayerForm() {
        setUiState({...uiState, showAddPlayerForm: true});
    }

    function explainWhoIsNext() {
        setUiState({...uiState, showHelp: true, timeIsOver: true});
    }

    function toggleHelp() {
        setUiState({...uiState, showHelp: !uiState.showHelp, timeIsOver: false});
    }

    function toggleAbout() {
        setUiState({...uiState, showAbout: !uiState.showAbout, timeIsOver: false});
    }

    function closeAbout() {
        setUiState({...uiState, showAbout: false});
    }

    function closeHelp() {
        setUiState({...uiState, showHelp: false});
    }

    function hideAddPlayerForm() {
        setUiState({...uiState, showAddPlayerForm: false});
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
                {!uiState.showAddPlayerForm &&
                    <button className="rpgui-button add-player-button" onClick={showAddPlayerForm}>
                        <p>Add Player</p>
                    </button>
                }
            </ul>
            {uiState.showAddPlayerForm && <AddPlayerForm onSubmit={addPlayer} onCancel={hideAddPlayerForm}/>}

            <div className="rpgui-container framed-grey buttons">
                <button className="rpgui-button" onClick={toggleSettings}><p>Settings</p></button>
                <button className="rpgui-button" onClick={toggleHelp}><p>Help</p></button>
                <button className="rpgui-button" onClick={rotate}><p>Rotate</p></button>
                <button className="rpgui-button" onClick={toggleAbout}><p>About</p></button>
                <TimerDisplay
                    timer={game.timer()}
                    status={game.timerStatus()}
                    clock={clock}
                    onFinish={timeOver}
                    onStart={continuePlaying}
                />
            </div>

            {uiState.showHelp && <Help game={game} timeIsOver={uiState.timeIsOver} onClose={closeHelp}/>}

            {uiState.showSettings &&
                <div className="rpgui-container framed-golden settings">
                    <form onSubmit={submitSettingsForm}>
                        <label>Change Players
                            <textarea id="change-players" name="change-players"
                                      defaultValue={game.playerNames()}></textarea>
                        </label>
                        <label>Change Timer (in minutes)
                            <input id="change-timer" name="change-timer"
                                      defaultValue={game.timerInMinutes()}></input>
                        </label>
                        <button type="submit" className="rpgui-button"><p>Save</p></button>
                        <button className="rpgui-button" onClick={toggleSettings}><p>Close</p></button>
                    </form>
                </div>
            }
            {uiState.showAbout && <About onClose={closeAbout}/>}
        </div>
    );
};

export default MobProgrammingRPG;
