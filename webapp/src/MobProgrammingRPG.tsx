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
import { addGameIdToUrl, noGameIdInUrl } from "./infrastructure/GameIdFromUrl";
import { avatars } from "./model/Player";

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
        showWhoIsNext: false,
        showAbout: false,
        timeIsOver: false,
    });

    useEffect(() => {
        if (noGameIdInUrl()) {
            addGameIdToUrl(game.id());
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

    function showAddPlayerForm() {
        setUiState({...uiState, showAddPlayerForm: true});
    }

    function hideAddPlayerForm() {
        setUiState({...uiState, showAddPlayerForm: false});
    }

    function submitAddPlayerForm(e) {
        const formData = new FormData(e.target);
        const playerName = formData.get("name") as string;
        const avatar = formData.get("avatar") as string;
        gameRef.current.addPlayer(playerName, avatar);
        updateGameState();
        hideAddPlayerForm();
        e.preventDefault();
    }

    function explainWhoIsNext() {
        setUiState({...uiState, showWhoIsNext: true, timeIsOver: true});
    }

    function toggleHelp() {
        setUiState({...uiState, showWhoIsNext: !uiState.showWhoIsNext, timeIsOver: false});
    }

    function toggleAbout() {
        setUiState({...uiState, showAbout: !uiState.showAbout, timeIsOver: false});
    }

    function closeAbout() {
        setUiState({...uiState, showAbout: false});
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
            {uiState.showAddPlayerForm &&
              <div className="add-player-form rpgui-container framed-golden-2">
                <form onSubmit={submitAddPlayerForm}>
                  <input placeholder={"Player Name"} name="name"/>

                  <div className="avatar-select">
                    <input type="hidden" id="avatar-input" value={avatars[0]} name="avatar"/>
                      {avatars.map((avatar) =>
                          <div className="avatar-option" id={`avatar-option-${avatar}`} key={avatar} onClick={() => {
                              document.getElementById('avatar-input')!!.setAttribute('value', avatar)
                              Array.from(document.getElementsByClassName('avatar-option')).forEach((element) => {
                                  element.setAttribute('class', 'avatar-option');
                              })
                              document.getElementById('avatar-option-' + avatar)!!.setAttribute('class', 'avatar-option selected');
                          }}>
                              <img src={`${process.env.PUBLIC_URL}/img/avatars/${avatar}.png`} alt={avatar}/>
                          </div>
                      )}
                  </div>

                  <button type="submit" className="rpgui-button golden"><p>Add</p></button>
                  <button className="rpgui-button golden" onClick={hideAddPlayerForm}><p>Cancel</p></button>
                </form>
              </div>
            }
            {!uiState.showAddPlayerForm &&
              <button className="rpgui-button add-player-button" onClick={showAddPlayerForm}><p>Add Player</p></button>
            }
            <div className="rpgui-container framed-grey buttons">
                <button className="rpgui-button" onClick={toggleSettings}><p>Settings</p></button>
                <button className="rpgui-button" onClick={toggleHelp}><p>Help</p></button>
                <button className="rpgui-button" onClick={rotate}><p>Rotate</p></button>
                <button className="rpgui-button" onClick={toggleAbout}><p>About</p></button>
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
            {uiState.showAbout &&
              <div className="help-overlay rpgui-container framed-golden-2">
                <h1>Mob Programming RPG</h1>
                <p>
                  The goal of this game is to teach Mob Programming.<br/>
                  It's focus is on remote usage, but you may as well use it onsite.<br/>
                  Just share the link to your game with the other players.<br/>
                  Find the source code on <a href="https://github.com/gregorriegler/mob-programming-rpg">github</a>
                </p>

                <p>
                  The <a href="https://github.com/willemlarsen/mobprogrammingrpg">original Idea and roles</a> have been
                  developed by Willem Larsen.<br/>
                  Some of it is taken as is, but some is changed...<br/>
                </p>

                <p>
                  Credits for the retro rpg styling go to RonenNess for creating the <a
                  href="https://github.com/RonenNess/RPGUI">RPGUI</a><br/>
                  Thank you, Chris Hamons for the <a href="https://opengameart.org/content/dungeon-crawl-32x32-tiles">dungeon
                  crawler icons</a><br/>
                  And also CraftPix for the <a href="https://opengameart.org/content/48-pirate-stuff-icons">pirate stuff
                  icons</a><br/>
                  And for the beautiful <a href="https://www.flaticon.com/free-icon/pirate-ship_1907877">Pirate Ship</a><br/>
                </p>
                <button className="rpgui-button golden close-button" onClick={closeAbout}>

                  <p>Close</p>
                </button>
              </div>
            }
        </div>
    );
};

export default MobProgrammingRPG;
