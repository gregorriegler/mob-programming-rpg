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
import {Settings} from "./Settings";

type MobProgrammingRPGProps = {
    initGame?: Game;
    clock?: Clock;
    wsServer?: string,
    wsReconnect?: boolean,
}

const MobProgrammingRPG = (
    {
        initGame = Game.withProps({id: undefined, players: [], timer: 60 * 4}),
        clock = new RealClock(),
        wsServer = "ws://localhost:8080",
        wsReconnect = false,
    }: MobProgrammingRPGProps
) => {

    const [game, setGame, gameRef] = useWsGame(useLocalStorageGame(
        initGame
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

    const rotate = () => {
        gameRef.current.rotateToTarget();
        updateGameState();
    };

    const rotateByButton = () => {
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

    function openAddPlayerForm() {
        setUiState({...uiState, showAddPlayerForm: true});
    }

    function closeAddPlayerForm() {
        setUiState({...uiState, showAddPlayerForm: false});
    }

    function explainWhoIsNext() {
        setUiState({...uiState, showHelp: true, timeIsOver: true});
    }

    function toggleHelp() {
        setUiState({...uiState, showHelp: !uiState.showHelp, timeIsOver: false});
    }

    function closeHelp() {
        setUiState({...uiState, showHelp: false});
    }

    function toggleAbout() {
        setUiState({...uiState, showAbout: !uiState.showAbout, timeIsOver: false});
    }

    function closeAbout() {
        setUiState({...uiState, showAbout: false});
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
                    <button className="rpgui-button add-player-button" onClick={openAddPlayerForm}>
                        <p>Add Player</p>
                    </button>
                }
            </ul>
            {uiState.showAddPlayerForm &&
                <AddPlayerForm game={gameRef.current} updateGameState={updateGameState} close={closeAddPlayerForm}/>}

            <div className="rpgui-container framed-grey buttons">
                <button className="rpgui-button" onClick={toggleSettings}><p>Settings</p></button>
                <button className="rpgui-button" onClick={toggleHelp}><p>Help</p></button>
                <button className="rpgui-button" onClick={rotateByButton}><p>Rotate</p></button>
                <button className="rpgui-button" onClick={toggleAbout}><p>About</p></button>
                <TimerDisplay
                    timer={game.timerInMinutes()}
                    status={game.timerStatus()}
                    clock={clock}
                    onFinish={timeOver}
                    onStart={continuePlaying}
                />
            </div>

            {uiState.showHelp && <Help game={game} timeIsOver={uiState.timeIsOver} onClose={closeHelp}/>}
            {uiState.showSettings &&
                <Settings game={gameRef.current} updateGameState={updateGameState} onClose={toggleSettings}/>}
            {uiState.showAbout && <About onClose={closeAbout}/>}
        </div>
    );
};

export default MobProgrammingRPG;
